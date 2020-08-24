"""
모듈의 그래픽 구동을 위한 GUI 코드 파일. 본 코드로 프로그램 실행이 가능하다.
GUI code for main module. Can run the program with this file.

$ python GUI_(date).py
Author : hekim
Working Log : 2020-08-17 19:36(ver.1)
         2020-08-18 (ver.2_코드 수정 및 주석 추가) _ 개선예정작업 : 분산된 메인코드 재정렬 및, 너무 긴 코드 함수화, 프로그램 효율성 재고
         2020-08-18 (ver.2.1_사용자가 1~14번 외에도 222번 등을 입력가능한 부분 발견 후 except IndexError: 추가(추후 재 개선 예정))
         2020-08-20 (ver.3_함수로만 기술했던 프로그램을 클래스화 함(GUI와의 연동 편의를 위해서), 코드 대폭 변경)
         2020-08-21 (ver.4_GUI연동 과정에서 show_textview1,2, runprogram1,2 메서드 소스 수정 및 기타부분 대폭 수정...) _ 1차 완성
"""
#!/usr/bin/env python3

import sys
from PyQt5.QtWidgets import QApplication, QTextBrowser, QComboBox, QMainWindow, QAction, qApp, QMessageBox, QWidget
from PyQt5.QtGui import QIcon
import module_0821 as mod

ingt1 = None
ingt2 = None

class MyApp(QMainWindow): #QWidget의 상속 클래스였으나, 통합과정에서 QMainWindow로 변경
    def __init__(self):
        super().__init__()
        self.initUI()

    def ShowDialog(self):
        msgBox = QMessageBox()
        msgBox.setText(
            "이 프로그램은\n..\n...\n....\n.....\n......")
        msgBox.setWindowTitle("소개")
        msgBox.setStandardButtons(QMessageBox.Close)

        returnValue = msgBox.exec()
        if returnValue == QMessageBox.Close:
            return None

    def initUI(self):
        #최상단 메뉴바 관련 코드
        exitAction = QAction(QIcon(None), 'Exit', self)  # 하위메뉴1
        exitAction.setStatusTip('프로그램 종료')
        exitAction.triggered.connect(qApp.quit)  # 이벤트 연결

        explAction = QAction(QIcon(None), 'About..', self)  # 하위메뉴2
        explAction.setStatusTip('프로그램 설명')
        explAction.triggered.connect(MyApp.ShowDialog)  # 이벤트 연결

        self.statusBar()  # 대소문자 주의 #하단에 상태바 생성(StatusTip 출력될 곳)

        menubar = self.menuBar()  # 바 생성
        menubar.setNativeMenuBar(False)  # Mac에서도 Win처럼 보이게 함.
        filemenu = menubar.addMenu('메뉴')  # 상위 메뉴 생성
        filemenu.addAction(explAction)  # 하위메뉴 연결
        filemenu.addAction(exitAction)  # 하위메뉴 연결

        #상단 콤보 박스 2개
        cb = QComboBox(self)
        ingr_list = ["파","우유","양파","오이","두부","계란","당근","시금치","콩나물","감자","무","가지","양배추","어묵","대파"]
        cb.addItem("선택하세요(필수)")
        for i in ingr_list:
            cb.addItem(i)
        cb.move(50, 50)
        cb2 = QComboBox(self)
        cb2.addItem("선택 안함")
        for i in ingr_list:
            cb2.addItem(i)
        cb2.move(180, 50)

        cb.activated[str].connect(self.chg_glovar1) #콤보박스 값을 선택할 때마다 전역변수 ingt1,2의 값이 변한다.
        cb2.activated[str].connect(self.chg_glovar2) #이와 동시에 텍스트 브라우저의 출력 값도 다시 불러온다.
        #cb.activated.connect(self.run_funcs) -> 별도의 코드로 작성하자 매개변수가 바뀌는 시점과 함수가 호출되는 시점이 이상하게 꼬였었음..(이런것 주의)

        #하단 텍스트 브라우저 2개
        self.tbr1 = QTextBrowser(self)
        self.tbr1.move(50, 150)
        self.tbr1.resize(250, 150)
        self.tbr2 = QTextBrowser(self)
        self.tbr2.move(50, 300)
        self.tbr2.resize(250, 150)

        self.setWindowTitle('냉장고를 비우자!')
        self.resize(350, 550)
        self.show()

    def run_funcs(self):
        self.show_tbr1()
        self.show_tbr2()

    def chg_glovar1(self, text):
        global ingt1
        global ingt2#
        if text == "선택 안함":
            ingt1 = None
        else:
            ingt1 = text
        print("ingt1=",ingt1, "ingt2=",ingt2)
        self.run_funcs() #최신 전역변수 값으로 재실행하여 텍스트 브라우저 값을 변경함.

    def chg_glovar2(self, text):
        global ingt1#
        global ingt2
        if text == "선택 안함":
            ingt2 = None
        else:
            ingt2 = text
        print("ingt1=", ingt1, "ingt2=", ingt2)
        self.run_funcs() #

    def runpro1(self):
        global ingt1
        global ingt2
        return mod.runprogram1(ingt1, ingt2) #인덱스0:메뉴명, 인덱스1:재료들인 리스트
    def runpro2(self):
        menus = self.runpro1()
        menus = menus[0]
        a = mod.runprogram2(menus)
        return a

    def show_tbr1(self):
        self.tbr1.clear()
        list_name_and_print = self.runpro1()
        for i in list_name_and_print[1]:    #재료들인 인덱스1 출력
            self.tbr1.append(i)
    def show_tbr2(self):
        self.tbr2.clear()
        for_print = self.runpro2()
        for i in for_print:
            self.tbr2.append(i)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = MyApp()
    sys.exit(app.exec_())
