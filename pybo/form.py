from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, FileField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Length , EqualTo, Email
from flask_wtf.file import FileAllowed

# 질문 폼
class QuestionForm(FlaskForm):
    subject = StringField('제목', validators=[DataRequired('제목을 입력해주세요 !')])
    content = TextAreaField('내용', validators=[DataRequired('내용을 입력해주세요 !')])
    file = FileField('이미지파일', validators=[FileAllowed(['jpg','png','txt'],'jpg/png/txt 파일만 지원합니다 (500kb)이하')])

# 답변 폼
class AnswerForm(FlaskForm):
    content = TextAreaField('내용',validators=[DataRequired('내용을 입력해주세요 !')])


# 회원가입 폼
class SignupForm(FlaskForm):
    username = StringField('사용자이름', validators=[DataRequired(), Length(min=3, max=25)])
    password1 = PasswordField('비밀번호', validators=[
        DataRequired(), EqualTo('password2', '비밀번호가 일치하지 않습니다 !')])
    password2 = PasswordField('비밀번호확인', validators=[DataRequired()])
    email = EmailField('이메일', [DataRequired(), Email()])
    phone = StringField('전화번호',validators=[DataRequired() , Length(min=10,max=11)])

#로그인 폼
class LoginForm(FlaskForm):
    username = StringField('사용자이름', validators=[DataRequired(), Length(min=3, max=25)])
    password = PasswordField('비밀번호', validators=[DataRequired()])

#회원 정보수정
class UpdateForm(FlaskForm):
    password1 = PasswordField('현재 비밀번호', validators=[DataRequired()])
    password2 = PasswordField('변경할 비밀번호', validators=[
    DataRequired(), EqualTo('password3', '변경할 비밀번호가 일치하지 않습니다. !')])
    password3 = PasswordField('변경할 비밀번호 확인', validators=[DataRequired()])

# 게시글검색
class SearchForm(FlaskForm):
    searchword = StringField('검색 단어', validators=[DataRequired()])