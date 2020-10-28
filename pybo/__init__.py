from flask import Flask



def create_app():
    app = Flask(__name__)

    app.config.from_envvar('APP_CONFIG_FILE')
    # 파일 업로드시 최대용량 제한 단위는 바이트
    app.config['MAX_CONTENT_LENGTH'] = 500 * 1024


    #날짜 필터링
    from .filter import format_datetime
    app.jinja_env.filters['datetime'] = format_datetime

    #블루프린트
    from .views  import main_views, answer_views , question_views, sign_views, manage_views , information_views
    app.register_blueprint(main_views.bp)
    app.register_blueprint(answer_views.bp) #답변등록 블루프린트
    app.register_blueprint(question_views.bp) # 게시글 관련 블루프린트
    app.register_blueprint(sign_views.bp) # 로그인 / 회원관리 블루프린트
    app.register_blueprint(manage_views.bp) # 관리자 페이지 블루프린트
    app.register_blueprint(information_views.bp) # 회원정보 블루프린트

    return app