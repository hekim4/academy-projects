"""
For searching and showing proper menu based on ingredients of refrigerator,
refer the text files in 'menu' directory(which can generated when you run the 'menu_gen_date.py' for generate virtual recipe files).
User can use this program by running 'GUI_date.py' or 'first_program.exe' file, and choose one or two ingredients from the program.
As a result of search, this program will show the ingredient list and recipes to user.

menu_gen_date.py를 통해 생성된 가상의 레시피 pool을 바탕으로, 사용자로부터 1~2개의 재료를 선택받아
선택에 매칭되는 레시피만을 찾아내고, 사용자가 보기 좋도록 출력해주는 프로그램이다. 재료 선택 pool은 사용자가 임의로 수정할 수 없으나,
사용자에게 보여줄 레시피는 메뉴명을 작성하여 선택할 수 있도록 구현 작업 중에 있다.

본 프로그램을 꼭 레시피가 아니더라도, 특정 디렉터리 내부의 txt형식의 파일들을 탐색하여 원하는 값을 찾아내는 기능을 가지고 있으므로,
시판 화장품들 중 알러지 성분을 포함하는 화장품명 검색, 간편식품 중 유해 식품첨가물을 포함하는 식품명 검색 등 코드의 일부 재사용이 가능하다.
그 밖에도... 추후, txt파일의 DB화(.json, .xml 형식 활용), txt파일을 위한 크롤링 기술 등이 추가 될 여지가 있다.

$ python module_(date).py
Author : hekim
Working Log : 2020-08-17 19:36(ver.1)
         2020-08-18 (ver.2_코드 수정 및 주석 추가) _ 개선예정작업 : 분산된 메인코드 재정렬 및, 너무 긴 코드 함수화, 프로그램 효율성 재고
         2020-08-18 (ver.2.1_사용자가 1~14번 외에도 222번 등을 입력가능한 부분 발견 후 except IndexError: 추가(추후 재 개선 예정))
         2020-08-20 (ver.3_함수로만 기술했던 프로그램을 클래스화 함(GUI와의 연동 편의를 위해서), 코드 대폭 변경)
         2020-08-21 (ver.4_GUI연동 과정에서 show_textview1,2, runprogram1,2 메서드 소스 수정 및 기타부분 대폭 수정...) _ 1차 완성
         2020-08-24 (ver.5_ret_nameandingr()함수의 인덱싱이 잘못된 점을 발견하여 수정, 연관된 find_index()도 수정_라인 55,68)
         2020-08-25 (runprogram1(), ret_m_names() 코드 수정으로 menu디렉토리 미 존재시 강제종료되던 현상 수정)
"""
#!/usr/bin/env python3

import os

class ChoosingMenu():
    def __init__(self, ingt1=None, ingt2=None):
        self.ingt1 = ingt1
        self.ingt2 = ingt2

    def ret_m_names():
        path = ".\\menu"
        if os.path.isdir(".\\menu"):
            file_list = os.listdir(path)
            m_names = []
            for i in file_list:
                m_names.append(i.split(".")[0])
            return m_names
        else:
            #print("검색할 레시피들이 담긴 menu 폴더를 찾을 수 없었습니다.")
            return None

    def ret_nameandingr(m_names):
        nameandingr = []
        for i in range(len(m_names)):
            with open(".\\menu\\{}.txt".format(m_names[i]), "r") as f:  #m_names[i] 연 상태
                temp_dic = {}
                rdata = f.readline().split(",")
                rdata.append(rdata[len(rdata) - 1].split("\n")[0])
                del rdata[-2]
                temp_dic[m_names[i]] = rdata #이전에 잘못 쓴 값 temp_dic[m_names[i - 1]] = rdata
                nameandingr.append(temp_dic)
        return nameandingr

    def find_index(self, m_names, nameandingr):
        # menu\*.txt 파일들을 가공하여 생성한 리스트(nameandingr)를 참조하여,
        # 사용자 선택 재료 재료 1,2를 포함하는 nameandingr리스트의 인덱스 넘버를 반환

        #nameandingr의 구조 : 리스트 안에 딕셔너리들을 원소로 가지며, 각 딕셔너리는 키 값으로 메뉴명을 벨류 값으로 해당 재료의 리스트를 가짐
        #                    ex) [{'닗나물': ['파']}, {'먼쓍국': ['어묵', '계란', '감자', '콩나물', '당근', '양파', '우유', '무']}]
        list_index = []
        for i in range(0, len(m_names) - 1):
            #temp_m_ingts = nameandingr[i]["{}".format(m_names[i - 1])] #벨류 값 호출은 dict명[키값=메뉴명], 여기서 dict명은 nameandingr의 i번째 원소.
            temp_m_ingts = nameandingr[i]["{}".format(m_names[i])] #위에는 고치기 전의 값
            if self.ingt2 == None:
                for j in [self.ingt1]:
                    if j in temp_m_ingts:
                        list_index.append(i) #리스트 원소 번호 = i, 찾는 값 = j, 인덱스 번호 = temp_m_ingts.index(j)
            else:
                if self.ingt1 in temp_m_ingts:
                    if self.ingt2 in temp_m_ingts:
                        list_index.append(i) #리스트 원소 번호 = i, 찾는 값 = ingt1, ingt2, 인덱스 번호 = temp_m_ingts.index(ingt1), temp_m_ingts.index(ingt2)
        return list_index

    # "'메뉴명'의 재료: ~~~ "와 같은 형태로 메뉴명과 재료를 출력해주는 함수.
    def show_textview1(self, nameandingr, list_index):
    #def show_textview1(self, results_index, nameandingr, list_index):
        founded_mname = []
        for_print_text = []
        for i in list_index:
            temp_convert_s = str(nameandingr[i])
            temp_name = temp_convert_s[2:temp_convert_s.find(":")-1]
            founded_mname.append(temp_name)
            temp_list = "{}의 재료: {}".format(temp_name, ",".join(nameandingr[i][temp_name]))
            for_print_text.append(temp_list)
            #print(temp_name, "의 재료: " ,",".join(nameandingr[i][temp_name]))#
        #print("")#
        for_print_text.sort(key=len)
        return [founded_mname, for_print_text]

    # "[메뉴명] \n 레시피~"의 형태로 메뉴명과 레시피를 출력해주는 함수.
    def show_textview2(self, result_menus):
        if result_menus == []:
            returnlist = "매칭되는 레시피가 없습니다."
        else:
            returnlist = []
            for i in result_menus:
                with open(".\\menu\\{}.txt".format(i), "r") as f:
                    temp_reci = f.readlines()
                    del temp_reci[0]
                    returnlist.append("{}의 레시피:\n {}".format(i, "".join(temp_reci)))
                    #print("[{}]".format(i))#
                    #print("".join(temp_reci))#
        return returnlist

def runprogram1(ingt1, ingt2):
    m_names = ChoosingMenu.ret_m_names()
    if m_names == None:
        return [[], ['menu 디렉토리를 찾을 수 없습니다.\n\n※경고 : 레시피 입력/수정/삭제 메뉴도 \nmenu 디렉토리를 발견할 수 없어 \n프로그램이 오작동 될 수 있으니 반드시 \nmenu_gen_(date).exe파일로 \n디렉토리 및 레시피들을 생성해 주세요!']]
    else:
        nameandingr = ChoosingMenu.ret_nameandingr(m_names)
        me = ChoosingMenu(ingt1, ingt2)
        result_index = me.find_index(m_names, nameandingr)
        #result_menus = me.show_textview1(m_names, nameandingr, result_index)
        result_menus = me.show_textview1(nameandingr, result_index)
        #print(result_menus)
        if result_menus == [[], []]:
            return [[], ['적절한 레시피가 없습니다.']]
        else:
            return result_menus

def runprogram2(result_menus):
    forreturn_list = ChoosingMenu().show_textview2(result_menus)
    return forreturn_list

######################################  end of program  ################################################################
######################################    run  program  ################################################################

if __name__ == "__main__":
    a = runprogram1("양배추", None) #모듈 정상작동 확인을 위해 임의 값 입력
    #print(a) #상단 메서드들의 주석처리한 print코드를 다시 살려야 구동여부 확인가능하다.
    runprogram2(a[0])

    signal = "a"
    while signal != "q":
        signal = input("끝내시려면 q를 입력하세요: ")
    print("종료")
########################################################################################################################