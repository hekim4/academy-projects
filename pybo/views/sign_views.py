from flask import Blueprint, url_for, render_template, flash, request, session,g
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import redirect
from pybo.form import SignupForm , LoginForm
import functools
import mariadb


bp = Blueprint('auth', __name__, url_prefix='/auth')
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


# 회원가입
@bp.route('/signup/', methods=('GET', 'POST'))
def signup():
    form = SignupForm()
    if request.method == 'POST' and form.validate_on_submit():
        userpw = generate_password_hash(form.password1.data)
        conn = connect_data()
        cur = conn.cursor()
        cur.execute("SELECT nick_name FROM reporter r WHERE r.nick_name like '{}' ".format(form.username.data))
        data = cur.fetchall()
        if data == []:
            conn = connect_data()
            cur = conn.cursor()
            sql = "INSERT INTO reporter(nick_name,pw,email,phone) VALUES('{}','{}','{}','{}'); ".format(form.username.data,
            userpw,form.email.data,form.phone.data)
            cur.execute(sql)
            conn.commit()

            return redirect(url_for('main.loot'))
        else:
            flash('이미 존재하는 사용자입니다.')
    return render_template('sign/signup.html', form=form)



# 로그인
@bp.route('/login/', methods=('GET','POST'))
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        error = None

        conn = connect_data()
        cur = conn.cursor()
        cur.execute("SELECT r_id,nick_name,email,phone FROM reporter r WHERE r.nick_name like '{}'".format(form.username.data))
        user = cur.fetchone()

        if user == None:
            error = "존재하지 않는 사용자입니다."

        else:

            userid = form.username.data
            cur.execute("SELECT pw FROM reporter WHERE reporter.nick_name ='{}'".format(form.username.data))
            password = cur.fetchone()

            if not check_password_hash(password[0],form.password.data):
                error = "비밀번호가 틀렸습니다."

        if error is None:
            session.clear()
            session['user_id'] = userid
            return redirect(url_for('main.loot'))
        flash(error)
    return render_template('sign/login.html', form=form)

# 현재 세션에 로그인 되어있는지 확인
@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = user_id


# 로그아웃 (세션 초기화)
@bp.route('/logout/')
def logout():
    session.clear()
    return redirect(url_for('main.loot'))


# 데코레이터 함수 (다른함수에서 어노테이션을 지정하면 해당함수가 먼저실행됨)
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)
    return wrapped_view
