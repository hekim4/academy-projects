# ---------------------------------------- [edit] ---------------------------------------- #
from flask import Blueprint, render_template  , url_for, request,g , session
from werkzeug.utils import redirect, secure_filename
import os
from ..form import QuestionForm, AnswerForm ,SearchForm
from pybo.views.sign_views import login_required
import mariadb
import sys
import math
from flask import Flask, send_from_directory, send_file
import datetime


# 파일 업로드와 다운로드파일을 관리하는 폴더의 경로
path = 'c:/projects/myproject/pybo/uploads/'

bp = Blueprint('question', __name__, url_prefix='/question')

# 데이터베이스 연결
def connect_data():
    conn = mariadb.connect(
        user="root",
        password="1234",
        host="localhost",
        port=3306,
        database="d_test"
    )
    return conn

# 질문 목록
@bp.route('/list/', methods=('GET','POST'))
def _list():
    form = SearchForm()

    p_page = request.args.get('page',type=int,default=1)
    per_page = 10
    limit = (p_page - 1) * 10
    #POST 방식으로 호출되었다면 입력받은 단어를 검색
    if request.method == 'POST' and form.validate_on_submit():
        word = form.searchword.data
        conn = connect_data()
        cur = conn.cursor()
        cur.execute("""SELECT count(*) 
        FROM post  
        WHERE content LIKE '%{}%';""".format(word))
        total_cnt = len(cur.fetchall())
        total_page = math.floor(total_cnt/per_page) + 2
        cur.execute("""SELECT p.p_id, p.title , p.content, r.nick_name, p.reg_date 
                FROM post as p 
                LEFT JOIN reporter as r 
                ON p.reporter = r.r_id
                WHERE p.title LIKE '%{}%' ORDER BY p_id DESC limit {},10;""".format(word, limit))
        question_list = cur.fetchall()
        return render_template('question/question_list.html', question_list=question_list, lp = total_page, p_page=p_page, form = form)

    conn = connect_data()
    cur = conn.cursor()
    cur.execute("SELECT count(*) FROM post")
    total_cnt = cur.fetchone()
    total_page = math.floor(total_cnt[0]/per_page) + 2
    cur.execute("SELECT p.p_id,p.title,p.content,r.nick_name,p.reg_date FROM post as p LEFT JOIN reporter as r ON p.reporter = r.r_id ORDER BY p_id DESC limit {},10".format(limit))
    question_list = cur.fetchall()


    return render_template('question/question_list.html', question_list=question_list, lp = total_page,p_page=p_page, form=form)

# 질문 상세 페이지
@bp.route('/detail/')
def detail():
    q = request.args.get('q',type=int)
    form = AnswerForm()
    conn = connect_data()
    cur = conn.cursor()
    cur.execute("SELECT title , content , reporter , reg_date , p_id, imgfile FROM post where p_id = {} ".format(q))
    question = cur.fetchone()
    cur.execute("SELECT nick_name FROM reporter WHERE r_id = {}".format(question[2]))
    reporter = cur.fetchone()
    cur.execute("SELECT a.content, a.reg_date, r.nick_name FROM answer a LEFT JOIN reporter as r ON r.r_id = a.reporter WHERE p_id = {}".format(q))
    answer = cur.fetchall()


    return render_template('question/question_detail.html', question=question, form=form, reporter = reporter , answer = answer)

# 업로드하려는 파일이 서버에 업로드되어있는지 체크하는 재귀함수
def checkfile(file):
    conn = connect_data()
    cur = conn.cursor()
    f = file
    cur.execute("SELECT imgfile FROM post WHERE imgfile = '{}'".format(f))
    checkimg = cur.fetchone()
    if checkimg:
        f = '(1)' + f
        return checkfile(f)
    else:
        return f

# 질문 생성(세션에 로그인 되어있어야함)
@bp.route('/create/', methods=('GET','POST'))
@login_required
def create():
    form = QuestionForm()
    if request.method == 'POST' and form.validate_on_submit():
        conn = connect_data()
        cur = conn.cursor()
        path = 'c:/projects/myproject/pybo/uploads/'

        if request.files['file']:

            f = request.files['file']
            name = checkfile(f.filename)

            f.save(path+ name)
            cur = conn.cursor()
            cur.execute("SELECT r_id FROM reporter WHERE nick_name = '{}'".format(g.user))
            reporter = cur.fetchone()
            cur.execute("""INSERT INTO post
                        (title, content, reporter, reg_date, pub_date,imgfile)
                        VALUES('{}','{}', {}, current_timestamp(), NULL,'{}');""".format(form.subject.data,
                                                                                         form.content.data,
                                                                                         reporter[0], name))
            conn.commit()
        else:


            cur = conn.cursor()
            cur.execute("SELECT r_id FROM reporter WHERE nick_name = '{}'".format(g.user))
            reporter = cur.fetchone()
            cur.execute("""INSERT INTO post
            (title, content, reporter, reg_date, pub_date,imgfile)
            VALUES('{}','{}', {}, current_timestamp(), NULL, NULL);""".format(form.subject.data, form.content.data,
                                                                             reporter[0]))
            conn.commit()






        return redirect(url_for('question._list'))
    return render_template('question/question_form.html', form=form)





# 게시글 삭제
@bp.route('/delete')
def post_delete():
    user_id = session.get('user_id')
    question_name = request.args.get('user', type=str)
    if user_id == "admin":
        p_id = request.args.get('p_id', type=int)
        conn = connect_data()
        cur = conn.cursor()
        cur.execute("DELETE FROM post WHERE p_id = {}".format(p_id))
        conn.commit()
        return redirect(url_for('question._list'))

    elif user_id == question_name:
        p_id = request.args.get('p_id', type=int)
        conn = connect_data()
        cur = conn.cursor()
        cur.execute("DELETE FROM post WHERE p_id = {}".format(p_id))
        conn.commit()

        return redirect(url_for('question._list'))
    return redirect(url_for('question._list'))

# 파일 다운로드
@bp.route('download')
@login_required
def download():
    imgnum = request.args.get('img', type=str)

    return send_file(path + imgnum, attachment_filename= imgnum,as_attachment=True)





