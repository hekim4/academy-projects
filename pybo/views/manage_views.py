from flask import Blueprint, render_template, url_for , request ,session
from werkzeug.utils import redirect
import mariadb
import math
bp = Blueprint('manage', __name__,url_prefix='/manage')

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





#회원관리
@bp.route('/')
def manage():
    p_page = request.args.get('page', type=int, default = 1)
    per_page = 10
    limit = (p_page -1) * 10

    conn = connect_data()
    cur = conn.cursor()
    cur.execute("SELECT count(*) FROM reporter")
    total_cnt = cur.fetchone()
    total_page = math.ceil(total_cnt[0]/per_page)
    cur.execute("SELECT r_id, nick_name, email,phone,reg_date FROM reporter ORDER BY r_id DESC limit {},10".format(limit))
    user_list = cur.fetchall()

    return render_template('/sign/manage.html', user_list = user_list, lp = total_page,p_page=p_page)


# 회원 탈퇴
@bp.route('/delete')
def signout():
    user_id = session.get('user_id')
    if user_id == "admin":
        r_id = request.args.get('r_id', type=int)


        conn = connect_data()
        cur = conn.cursor()
        cur.execute("DELETE FROM reporter WHERE r_id = {}".format(r_id))
        conn.commit()
        return redirect(url_for('manage.manage'))

    return redirect(url_for('manage.manage'))


