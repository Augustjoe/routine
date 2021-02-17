node入门 ： https://www.nodebeginner.org/index-zh-tw.html

  ## 数据库
   - 启动和关闭数据库
     + 在控制台中输入 mongod 即可启动
     + mongodb默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录，所以第一次执行时应自己手动新建一个 /data/db
     + 如果想要修改默认的数据存储目录 可以 mongod --dbpath = 数据存储信息的目录
     + ctrl+c 即可停止
   - 连接和退出数据库
     + mongo 该命令默认连接本机的 MongoDB服务
     + 在连接状态输入 exit 即可退出 
   - 基本命令
     + show dbs 查看所有数据库
     + show collections 显示当前操作数据库下的所有表
     + db 查看当前操作的数据库 默认是test，但无法查看，插入一条数据时会自动新建。 
          也可以通过db直接新建数据库表，如 db.students.inserOne ({"name":"Jack"}) 新建了一个students的表
     + db."表名".find() 在表中查询数据 不输入查询所有
     + use + "数据库名称" 切换到指定的数据库（如果没有会新建）
     + 
  ##  如何用nodeJS来操控数据库
    

