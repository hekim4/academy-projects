from flask import Blueprint, render_template , request
import mariadb
import math

bp = Blueprint('main', __name__,url_prefix='/')

# 데이터베이스 연결
def connect_data():
    conn = mariadb.connect(
        user="root",
        password="1234",
        host="localhost",
        port=3306,
        database="dd_test"
    )
    return conn



# 코인 시세화면
@bp.route('/')
def loot():
    return render_template('api_onworking.html')

# 관리자 페이지
@bp.route('/manage')
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

# 거래사이트 소개 페이지
@bp.route('/introduce')
def introduce():
    return render_template('introduce.html')

# 코인 소개 페이지
@bp.route('/introduce_coin')
def introduce_coin():
    return render_template('introduce_coin.html')

# 페이지 소개 페이지
@bp.route('/int')
def int():
    return render_template('int.html')
