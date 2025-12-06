---
课程名称: 
授课教师: 
tags: []
aliases: 2  简单VB程序设计
linter-yaml-title-alias: 2  简单VB程序设计
---

# 2  简单VB程序设计
## 2.1 可视化编程的基本概念
### 2.1.1 对象
从可视化编程的角度来看，对象是一个具有某些属性和方法并能响应外部事件的实体。  
每个对象都有**三要素**：属性、方法和事件。  
![](wps1.jpg)

---
### 2.1.2 类
对象是类的一个实例。  
类是对同一种对象的集合的概括与抽象。  
如：由按钮类可产生一个具体的按钮对象。  
VB中系统提供的类：窗体类和控件类。

---
### 2.1.3 VB中的类和对象
类有两种：  
1）由系统设计好的，用户可以直接使用。  
   如：窗体类和控件类。  
2）由用户定义，用户可以根据需要定义和建立。  
   如：在类模块中定义的自定义类。

---
### 2.1.4 属性
属性是指对象所具有的特征，不同的对象具有不同的属性。  
如：  
Name:对象的名称。  
Caption:对象的标题。  
Left,Top:对象左上角的坐标。  
Width,Height:对象的宽度和高度。

![](wps2.png)

---

### 2.1.5 事件

#### 1. 事件
事件是指对象能够识别并做出反应的外部引擎，每个对象都有自己的事件。  
如：  
Click:单击鼠标事件。  
Load:加载窗体事件。  
Unload:卸载窗体事件。(cnacel参数为假时退出)  
Resize:控件大小改变事件。  
Change:控件内容改变事件。

---

#### 2. 事件过程

为了响应某个事件以完成某个功能，针对该事件编写一段程序代码，这样的一段程序代码称为事件过程。  
如：

```vb
private sub command1_click()
  text1.text="吉林大学"
end sub
VB中是通过事件来驱动程序的。
再如：
Private Sub Form_Unload(Cancel As Integer)
Dim msg
msg = MsgBox("真的要退出吗", vbYesNo, "提示")
If msg = vbNo Then
   Cancel = True
End If
End Sub
```

---
### 2.1.6 方法
方法是指对象所具有的动作和行为、即让对象产生某种动作的命令。  
命令格式：

```vb
[对象.]方法 [参数名称]
```

如：

```vb
print "VB6程序导学"
```

---

## 2.2 创建第一个VB应用程序

前面已经介绍了Visual Basic的基础知识，本节将告诉你如何建立自己的应用程序。在Visual Basic中创建应用程序有六个基本步骤。

1)创建用户界面。  
创建用户界面即设计窗体以及在窗体中放置控件和对象。设计时，可以参照其他应用程序的界面风格。  
2）设置对象的属性。  
对窗体和控件等对象进行属性的设置，可以在设计时进行，也可以通过代码在应用运行时修改它们的属性。  
3）编写事件代码。  
设置完毕窗体和控件的属性后，就可以编写它们响应事件的代码。在窗体和控件上发生不同动作时，会执行这些代码。  
4）保存工程。  
对已经完成的工作进行保存，给它取一个有代表性的名字，窗体和代码也同时被保存。  
5）测试、调试应用。  
运行应用，看它是否满足你的要求，代码编写是否正确。  
6）生成可执行文件。  
调试成功之后，应该建立它的可执行文件。

---

下面我们以制作下面的登录框为例来说明编写应用程序的步骤。

---
## 2.3 VB中的基本控件
### 2.3.1 概述
基本控件包括内部控件和ActiveX控件。  
每个控件都有控件类名，如：按钮控件的类名为CommandButton。

---

### 2.3.2 通用属性
通用属性是指大部分控件所具有的属性。  
1）Name属性。该属性只能在设计时设置，在程序运行时只能应用，不能改变。  
2）Caption属性。  
3）Height、Width、Top、Left属性。  
4）Font属性。  
    FontName  
    FontSize  
    FontBold  
    FontItalic  
    FontStrikethru(删除线)  
    FontUnderLine(下划线)  
    Enabled  
    Visible  
    ForeColor、BackColor  
默认属性：  
TextBox控件的默认属性为Text。  
Label控件的默认属性为Caption.

---

![](wps3.jpg)

---

### 2.3.3 窗体
#### 1.窗体对象的常用属性
1）Caption属性  
2）BackColor和ForeColor属性  
3）BorderStyle属性  
 0：无边框  
 1：固定单边框窗体，运行时不能改变窗体的大小  
 2：标准窗体形式，具有Windows标准窗体形式  
 3：固定对话框窗体形式，窗体的大小不能改变  
 4：固定工具窗体形式，只有一个关闭按钮，窗的大小不能改变  
 5：可变大小工具窗体形式，只有一个关闭按钮，窗的大小能改变  
4）WindowState属性  
 0:运行时的大小与设计相同  
 1：最小化状态  
 2：最大化状态  
5）MaxButton和MinButton属性  
设置窗体上这两个按钮是否可用  
6）Picture属性  
 添加一个背景图片  
7）Icon属性  
 添加在窗体左上角显示的窗口图标。可以加载扩展名为ico、cur的文件  
8）ControlBox属性  
 决定窗体标题栏上是否显示最大化、最小化、关闭按钮

---

#### 2. 窗体对象的常用事件
NaN. Load事件  
NaN. Unload事件  
NaN. Click事件  
NaN. MouseMove事件  
当用户在窗体上移动鼠标指针时产生。

---

#### 3. 窗体对象的常用方法
1）print方法  
2）Cls方法  
3）Show方法  
4）Hide方法  
5）Move方法  
绝对移动：Form1.Move 300,300  
相对移动：Form1.move Left+200,Top+300

---

鼠标在窗体上移动时显示坐标
![](wps4.jpg)
---

### 2.3.4 命令按钮
#### 1. 常用属性
（1）Caption属性  
设置命令按钮的标题。  
（2）Style属性  
设置命令按钮的类型。当类型为1时可用Picture属性在按钮上增加图片。  
（3）Picture属性  
设置命令按钮上显示的图形。  
（4）Cancel属性  
当其值为True时，当用户按Esc键时，触发它的Click事件。  
（5）Default属性  
当其值为True时，用户按回车键时触发它的Click事件。  
（6）Enabled属性  
设置该命令按钮是否可用。

---

#### 2. 命令按钮的常用事件
Click事件  
MouseDown和MouseUp事件

---

### 2.3.5 标签
#### 1. 常用属性
##### 1)BackStyle属性
0：表示是透明的。  
1：表示是不透明的。
##### 2)BorderStyle属性
0：表示无边框。  
1：表示单线边框。
##### 3)AutoSize属性
当此值为True时，控件随着内容而变化。
##### 4)Alignment属性
0：表示内容左对齐。  
1：表示内容右对齐。  
2：表示内容居中对齐。
##### 5)Caption属性

---

#### 2. 常用事件和方法
一般很少使用标签事件，标签的方法中常用的只有Move。  
Label1.Move left,top,width,height

---

### 2.3.6 文本框
#### 1.  常用属性
##### 1) Text属性
##### 1) MaxLength属性
设置文本框中可输入的最长字符数目。
##### 2) MultiLine属性
当其值为True时，可多行输入。
##### 3) PasswordChar属性
设置是否在控件中显示用户键入的字符。如果该属性设置为"*"，所输入的内容都变为*号，用来做密码输入。
##### 4) ScrollBars属性
设置文本框是否有垂直或水平滚动条。  
0：没有滚动条。  
1：水平滚动条。  
2：垂直滚动条。  
3：两样都有。
##### 5) SelLength、SelStart和SelText属性
SelLength：文本框内被选中文本的长度。  
SelStart：文本框内被选中文本的起始位置，计数从0开始。  
SelText：文本框内被选中的文本。

---

剪贴板(Clipboard)：  
GetText方法和SetText方法  
Clear方法

---

#### 2. 常用事件和方法

文本框的方法很少使用，较常用事件是Change和KeyPress;较常用方法是SetFocus。

1）Change事件

当文本框的内容被修改时触发。

2)KeyPress事件

当在文本框中按任一键时触发。

Private Sub Text1_KeyPress(KeyAscii as Integer)

      if KeyAscii=13 then

          msgbox("输入结束")

      end if

End Sub

Private Sub Text1_KeyPress(KeyAscii as Integer)

   KeyAscii=Asc(UCase(Chr(KeyAscii)))

End Sub

(3) SetFocus方法

将焦点移动到指定的对象。

---

实例：把选中的内容复制、剪切到剪贴板

           把剪贴板中的内容粘贴到当前位置

           删除选中部分    清除文本框中所有内容

![](wps5.jpg)---

2.3.7 单选按钮、复选框和框架

1. 单选按钮

（1） 常用属性

NaN. Caption属性

NaN. Value属性

True：表示选中。

False：默认值，表示未选中。

3）Alignment属性：标题的对齐方式

（2）常用事件

Click事件。

---

2. 复选框

（1）常用属性

NaN. Caption属性

设置显示标题。

2）Value属性

0：默认值，表示未复选。

1：表示选中。

2：表示灰色，并选中。

3）style属性

（2) 常用事件

复选框的常用事件为Click。

---

3. 框架

框架是一种容器，常用于将窗体上的对象进行分组。

![](wps6.jpg)---

### 2.3.8 列表框和组合框
#### 1. 列表框
##### (1)列表框的常用属性
NaN. ListCount属性  
   用于返回列表框中所有选项的总数。  
NaN. List属性  
    它是一个一维数组，数组中元素的值就是在执行时看到的列表项。  
    List(0)到List(Listcount-1)  
    假设：List1控件有n个项目  
          List1.list(m)="一个值"  
    如果m=n，则会在列表框的最后添加一个新的项目，如果m>n则出错。  
NaN. NaN. MultiSelect属性  
   0：（默认值）：表示不允许多重选择，用户一次只能选择一个。  
   1：表示简单多重选定，用户用鼠标单击可选取多个。  
   2：表示高级多重选定，用户可用Ctrl键与鼠标的配合来进行重复选取。  
NaN. ListIndex属性：被用户选中的项目的序号，如果当前没有项目被选中，则此属性值为-1。如果允许多选，该属性值为最后一个被选中的项目的序号。  
NaN. Selected属性  
 它是一个与List数组中的各个元素相对应的逻辑型数组，记录List数组中每个项目是否被选取。例如：如果List(1)被选取，则Selected(1)的值为True，如果List(1)未被选取，则其值为False。该属性在设计时不可用。

```vb
For i = 0 To List1.ListCount - 1
   If List1.Selected(i) = True Then
       Print List1.List(i)
   End If
Next i
```

NaN. Text属性：用于保存列表框当前所选项目。  
   list1.text相当于  
  list1.list(list1.listindex)  
Sorted属性：是否按字母、数字等升序排序。

---
##### （2）列表框的常用方法

###### 1）Additem方法
用于将项目增加到列表框中。  
List1.Additem Item,Index
###### 2) NaN. RemoveItem方法
用于从列表框中删除一个项目，其语法为：  
List1.RemoveItem Index
###### 3) NaN. Clear方法
删除列表框中的所有项目，其语法为：  
List1.Clear
##### （3）列表框常用事件
###### Click事件

```vb
Private Sub Command1_Click()
   List2.AddItem List1.Text
   List1.RemoveItem List1.ListIndex
End Sub
Private Sub Command3_Click()
  For i = 0 To List1.ListCount - 1
     List2.AddItem List1.List(0)
     List1.RemoveItem 0
  Next i
End Sub
```

---
#### 2. 组合框
是一种同时具有文本框和列表框特性的控件。
##### （1）组合框常用属性
###### 1) NaN. Style属性
0：（默认值）包括一个下拉式列表框和一个文本框的下拉式组合框。  
1：包括一个文本框和一个标准列表框的简单组合框。  
2：下拉式列表框。文本框中不能输入值。
###### 2) Text属性
在Style属性设置为0或1时，Text属性返回或设置编辑框中的文本。

---
##### (2) 常用事件和方法
（1）Change事件  
当组合框内容改变时发生。  
（2）Click事件  
当用户在一个组合框上单击鼠标按钮时发生。  
（3）AddItem方法  
增加一项到组合框控件中。  
（4）RemoveItem方法  
从组合框中删除一项。  
（5）Clear方法  
清除组合框的内容。

---
### 2.3.9 图片框和图像框
#### 1. 图片框
不仅可以用来显示图像，还可以作为容器放置其他控件。  
 图片框的常用属性：  
1）Picture属性  
 返回/设置图片框控件中显示的图形。在设置时，设计阶段可直接利用属性窗口指定，运行阶段可使用LoadPicture函数加载。  
 Picture1.Picture = LoadPicture("c:\windows\circles.bmp")  
 Picture1.picture=Picture2.picture  
2）AutoSize属性  
 决定控件是否能自动调整大小以显示内容。

---
#### 2. 图像框
图像框只能装图片，不能做为容器用。  
常用属性：  
1)Picture属性  
2)Stretch属性  
False：这是默认值，当图形载入时，图像框会自动调整大小，使得图形可以填满图像框。  
True：当图形载入时，图形自动调整大小，填满整个图像框。

---
### 2.3.10 滚动条
1. 常用属性：  
(1) Min  
设置滚动块位于滚动条顶端或者最左侧时所代表的值  
(2) Max  
设置滚动块位于滚动条底端或者最右侧时所代表的值  
(3) LargeChange  
当用户在滚动块的上方,下方(或者左方,右方)单击时增减的值  
(4) SmallChange  
当用户在滚动条两端类似箭头按钮上单击时增减的值  
(5) Value  
滚动条当前的值

---
2. 常用事件  
（1）Change事件  
当滚动条的Value属性值改变后可以激活。  
（2）Scroll事件  
当滚动的滑块被拖动的过程中，激发该事件。

---
### 2.3.11 定时器
1. 常用属性：  
(1) Enabled： 该属性为True时，表示定时器开始工作，为false时，表示关闭定时器。程序员可以在程序对这个属性加以设置，以控制定时器的开头。  
(2) Interval： 该属性用来设置定时器触发的周期（以毫秒计），在Timer控件Enabled属性设置为True时开始有效，例如，1000毫秒等于1秒。Interval属性的最大值为65535毫秒，大约等于1分钟多一些。  
Timer事件:每InterVal属性，触发一次该事件。  
![](wps7.jpg)![](wps8.jpg)![](wps9.jpg)
