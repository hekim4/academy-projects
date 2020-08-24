#from https://www.tutorialspoint.com/pyqt/qmenubar_qmenu_qaction_widgets.htm

import sys

from PyQt5.QtWidgets import QMainWindow, QHBoxLayout, QAction, QApplication


class menudemo(QMainWindow):
    def __init__(self, parent=None):
        super(menudemo, self).__init__(parent)

        layout = QHBoxLayout()
        bar = self.menuBar()
        file = bar.addMenu("File")
        file.addAction("New")

        save = QAction("Save", self)
        save.setShortcut("Ctrl+S")
        file.addAction(save)

        edit = file.addMenu("Edit")
        edit.addAction("copy")
        edit.addAction("paste")

        quit = QAction("Quit", self)
        file.addAction(quit)
        file.triggered[QAction].connect(self.processtrigger)
        self.setLayout(layout)
        self.setWindowTitle("menu demo")

    def processtrigger(self, q):
        print
        q.text() + " is triggered"


def main():
    app = QApplication(sys.argv)
    ex = menudemo()
    ex.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()