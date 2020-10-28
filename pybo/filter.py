


# 날짜의 가독성을 위해 년월일 시간 분 으로 필터링
def format_datetime(value, fmt='%Y년 %m월 %d일 %H:%M'):
    return value.strftime(fmt)