## 需要的依赖
  - express mongoose art-template  express-art-template
  - 出现 无法加载文件 C:\Users\WCS19\AppData\Roaming\npm\nodemon.ps1，因为在此系统上禁止运行脚本 的解决方法
    + set-ExecutionPolicy RemoteSigned 

## path路径操作模块系统
  - path.basename
    + 获取一个路径的文件名（默认包含扩展名
  - path.dirname
    + 获取一个路径中的目录部分
  - path.extname
    + 获取一个路径中的扩展名部分
  - path.parse
    + 把一个路径转为对象
      + root根路径
      + dir 目录
      + base 包含后缀名的文件名
      + ext 后缀名
      + name 不包含后缀名的文件名
  - path.parse
    + 当需要进行路径拼接的时候，使用这个方法
  - path.isAbsolute 判断一个路径是否是绝对路径
## Node中的其他成员
 在每个模块中有两个特殊成员
  __dirname可以用来获取当前文件模块所属目录的绝对路径
  __filename可以用来获取当前文件的绝对路径
   都是动态获取
  在文件操作中相对路径不可靠，要使用绝对路径
  不受执行目录影响的,为了避免路径错误应在将来使用绝对路径，模块中的路径不受影响
  require("./a") 模块中的路径标识就是相对于当前文件，不受执行路径影响