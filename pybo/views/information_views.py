from flask import Blueprint, render_template, url_for , request, session ,flash
from werkzeug.utils import redirect
from werkzeug.security import generate_password_hash, check_password_hash
import mariadb
from ..form import UpdateForm
bp = Blueprint('information', __name__,url_prefix='/information')



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


#회원 정보 수정
@bp.route('/', methods=('GET','POST'))
def information():
    form = UpdateForm()
    p_user_id = session.get('user_id')
    user_id = request.args.get('nick',type=str)
    # 정보수정을 하려는 유저와 현재 세션에 로그인되어있는 유저가 동일한지 판단
    if p_user_id == user_id:
        if request.method == 'POST' and form.validate_on_submit():
            error = None
            conn = connect_data()
            cur = conn.cursor()
            cur.execute('SELECT pw FROM reporter WHERE nick_name="{}"'.format(user_id))
            password = cur.fetchone()
            if not check_password_hash(password[0],form.password1.data):
                error = "비밀번호가 틀렸습니다."
            else:
                cur.execute('UPDATE reporter SET pw = "{}" WHERE nick_name ="{}"'.format(generate_password_hash(form.password2.data),user_id))
                conn.commit()
                msg = "비밀번호가 변경되었습니다. 변경된 비밀번호로 다시 로그인 해주세요."
                flash(msg)
                session.clear()
                return redirect(url_for('main.loot'))
            flash(error)
            return redirect(url_for('main.loot'))
        conn = connect_data()
        cur = conn.cursor()
        cur.execute('SELECT nick_name, email , phone FROM reporter WHERE nick_name="{}"'.format(user_id))
        information_list = cur.fetchone()
        return render_template('/sign/information.html', user=information_list , form = form)
    else:
        return redirect(url_for('main.loot'))



