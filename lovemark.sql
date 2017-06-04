-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-06-04 22:16:49
-- 服务器版本： 5.7.10-log
-- PHP Version: 5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lovemark`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `username` varchar(16) NOT NULL COMMENT '用户名',
  `account` varchar(11) NOT NULL COMMENT '账号',
  `password` varchar(16) NOT NULL COMMENT '密码',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `headimg` varchar(255) NOT NULL DEFAULT 'userimage/default.jpg' COMMENT '头像',
  `birth` date NOT NULL COMMENT '生日',
  `phonenumber` int(11) NOT NULL COMMENT '手机号码',
  `sex` set('man','women','','') NOT NULL COMMENT '性别'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`username`, `account`, `password`, `email`, `headimg`, `birth`, `phonenumber`, `sex`) VALUES
('stitch', '979987824', '12345678', '979987824@qq.com', 'userimage/markeruser1.jpg', '0000-00-00', 0, ''),
('elling', '2359804324', '12345678', '2359804324@qq.com', 'userimage/default.jpg', '0000-00-00', 0, ''),
('美女', '20155535112', '12345678', '2088943221@qq.com', 'userimage/markeruser}CYFHS8UUTPS9F422}~3GL6.jpg', '0000-00-00', 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `userworks`
--

CREATE TABLE `userworks` (
  `id` bigint(255) NOT NULL,
  `author` varchar(16) NOT NULL COMMENT '作者名',
  `workstitle` varchar(30) NOT NULL COMMENT '题目',
  `workscontent` mediumtext NOT NULL COMMENT '内容',
  `publishtime` datetime NOT NULL COMMENT '发布时间',
  `workslike` bigint(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `userworks`
--

INSERT INTO `userworks` (`id`, `author`, `workstitle`, `workscontent`, `publishtime`, `workslike`) VALUES
(8, 'elling', '哈哈 我也写一篇', '<p>啦啦啦啦啦啦啦啦啦啦~</p>', '2017-06-01 00:00:00', 0),
(9, 'elling', '再写一篇', '<p>哈哈哈哈 啊啦啦啦啦</p>', '2017-06-04 05:11:30', 0),
(10, 'elling', '再来又写一篇', '<p>分级考试了放假啊离开房间啊刘师傅教我日欧温柔iquriofjaslkfjoiwjios去哦irwioefisjfioajiowjeirojisjfiasjfiowje</p>', '2017-06-01 00:00:00', 0),
(12, 'elling', '发啊啊啊啊啊啊啊啊啊发生的萨芬萨发顺丰', '<p>额我认同我认为让我发顺丰撒网人忒恶人情味噶似的公司打工我去热热完全特务掐头去尾</p>', '2017-06-01 00:00:00', 0),
(13, 'elling', '发生发生飞洒发顺丰萨芬萨发放', '<p>飞洒地方微软</p>', '2017-06-01 00:00:00', 0),
(14, 'elling', '', '<p>发顺丰撒法舒服撒发射点发</p>', '2017-06-01 00:00:00', 0),
(24, 'stitch', '哟哟哟哟哟哟哟哟', '<p><img src="userimage/index-example.jpg" style="width: 530px;"></p><p>啦啦啦啦啦啦</p>', '2017-06-02 00:00:00', 0),
(25, 'stitch', '哈哈哈哈哈 终于搞定了', '<p><img style="width: 200px;" src="userimage/head-icon.jpg"><br></p><p>犯傻了一天 前端狗码后台的代码就是累</p>', '2017-06-01 00:00:00', 0),
(26, 'stitch', '修改过代码之后再写一篇', '<p><img style="width: 200px;" src="userimage/head-icon.jpg"></p><p>啊啊啊啊啊啊 不知道行不行呢</p>', '2017-06-01 00:00:00', 0),
(27, 'stitch', '测试测试123123', '<p><img src="userimage/head-icon.jpg" style="width: 200px;"></p><p>测试测试测试</p>', '2017-06-02 00:00:00', 0),
(28, 'stitch', '06-02 的一篇心情', '<p><img src="userimage/login-bg.jpg" style="width: 698px;"><br></p><p>啊哈哈哈哈哈哈哈</p>', '2017-06-02 00:00:00', 0),
(31, '美女', '', '<p>erwww</p>', '2017-06-03 12:13:13', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userworks`
--
ALTER TABLE `userworks`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `userworks`
--
ALTER TABLE `userworks`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
