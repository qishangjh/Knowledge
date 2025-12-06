---
课程名称: MATLAB
授课教师: 魏唯
tags: [编程, 程序语言]
---

# MATLAB

## 1. 简介

MATLAB（矩阵实验室）是一种用于数值计算、可视化和编程的高级技术计算语言和交互式环境。它广泛应用于工程、科学计算、数据分析、信号处理、图像处理等领域。

## 2. 安装与启动

- 下载并安装 MATLAB（需要许可证）
- 启动 MATLAB，你会看到命令窗口(Command Window)、工作区(Workspace)、当前文件夹(Current Folder)等界面组件

## 3. 基础语法

### 3.1 变量

```matlab
x = 5;          % 标量
y = 3.14;       % 浮点数
z = 2 + 3i;     % 复数
s = 'Hello';    % 字符串
```

### 3.2 向量和矩阵

```matlab
v = [1, 2, 3];              % 行向量
w = [1; 2; 3];              % 列向量
A = [1 2 3; 4 5 6; 7 8 9];  % 3x3 矩阵

% 特殊矩阵生成函数
zeros(3)        % 全零矩阵
ones(2,3)       % 全一矩阵
eye(3)          % 单位矩阵
rand(4)         % 随机矩阵 (0~1之间)
```

### 3.3 矩阵操作

```matlab
A'              % 转置
A * B           % 矩阵乘法
A .* B          % 元素对应相乘
A^n             % 矩阵幂
inv(A)          % 求逆矩阵
det(A)          % 行列式
size(A)         % 获取矩阵尺寸
length(v)       % 获取向量长度
```

### 3.4 控制流

```matlab
% if 语句
if x > 0
    disp('Positive')
elseif x == 0
    disp('Zero')
else
    disp('Negative')
end

% for 循环
for i = 1:5
    disp(i)
end

% while 循环
i = 1;
while i <= 5
    disp(i)
    i = i + 1;
end

% switch 语句
switch lower(s)
    case 'a'
        disp('Apple')
    case 'b'
        disp('Banana')
    otherwise
        disp('Unknown')
end
```

### 3.5 函数

```matlab
% 在文件 myFunction.m 中定义函数
function y = myFunction(x)
    y = x^2 + 2*x + 1;
end

% 使用函数
result = myFunction(3);
```

## 4. 绘图

### 4.1 二维绘图

```matlab
x = 0:0.1:2*pi;
y = sin(x);

plot(x, y)
title('Sine Wave')
xlabel('x')
ylabel('sin(x)')
grid on
legend('sin(x)')
```

### 4.2 三维绘图

```matlab
[x, y] = meshgrid(-2:0.2:2);
z = x .* exp(-x.^2 - y.^2);

surf(x, y, z)
title('Surface Plot')
xlabel('x')
ylabel('y')
zlabel('z')
colorbar
```

## 5. 文件操作

### 5.1 数据文件

```matlab
save myData.mat A x y      % 保存变量到文件
clear                      % 清除工作区变量
load myData.mat            % 加载数据
```

### 5.2 文本文件

```matlab
fid = fopen('data.txt', 'w');
fprintf(fid, 'Value of pi: %f\n', pi);
fclose(fid);

% 读取文件
type data.txt
```

## 6. 常用工具箱

- **Simulink**：动态系统建模和仿真
- **Signal Processing Toolbox**：信号处理
- **Image Processing Toolbox**：图像处理
- **Statistics and Machine Learning Toolbox**：统计学和机器学习
- **Optimization Toolbox**：优化算法
- **Control System Toolbox**：控制系统设计

## 7. 高级功能

### 7.1 并行计算

```matlab
parfor i = 1:100
    result(i) = someComputation(i);
end
```

### 7.2 面向对象编程

```matlab
classdef MyClass
    properties
        Value
    end
    
    methods
        function obj = MyClass(val)
            obj.Value = val;
        end
        
        function displayValue(obj)
            disp(['Value: ' num2str(obj.Value)])
        end
    end
end
```

## 8. 常用命令汇总

| 命令            | 功能       |
| ------------- | -------- |
|               | 清除命令窗口   |
| `clear`       | 清除工作区变量  |
| `who`, `whos` | 查看工作区变量  |
| `help`, `doc` | 查看帮助文档   |
| `format`      | 设置输出格式   |
| `dir`, `ls`   | 显示当前目录内容 |
| `cd`          | 改变当前目录   |

## 9. 学习资源

- MATLAB 官方文档: <https://www.mathworks.com/help/>
- MATLAB Academy 免费在线课程: <https://matlabacademy.mathworks.com/>
- MATLAB Central 社区: <https://www.mathworks.com/matlabcentral/>
