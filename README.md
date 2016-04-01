# sLib

> web develop lib like zepto

## API

### 原型扩展

#### Array.prototype.distinct
- 类型：布尔值
- 默认：false
- 两种不同的实现，false速度更优

#### String.prototype.trim
- 类型：布尔值
- 默认：false
- true为去掉字符串内所有空格，false只去掉首位空格

### 静态方法

#### $.getCookie(string)
- 类型：字符串
- 默认：undefined
- 根据key取cookie中的value值

#### $.setCookie(key, value, time)
- 类型：key字符串,value字符串，time毫秒数数字
- 默认：time默认一天
- 根据key取cookie中的value值

#### $.getElementsByClassName

#### $.getUrlParam

#### $.browser

#### $.nodelist2Array

#### $.isArray

#### $.isNaN

#### $.isNull

#### $.isUndefined

#### $.isPlainObject

#### $.contains

#### $.startsWith

#### $.endsWith

#### $.repeat

#### $.camelize

#### $.underscored

#### $.dasherize

#### $.capitalize

#### $.stripTags

#### $.stripScripts

#### $.escapeHTML

#### $.unescapeHTML

#### $.format

#### $.ajax

#### $.extend

### 实例方法

#### hide()

#### show()

#### each()

#### prePend()

#### addClass()

#### removeClass()

#### children()

#### setCss()

#### hasCLass()

#### isLast()

#### isFirst()

#### closet()

#### getIndex()

#### nextEle()

#### preEle()

#### nextSiblings()

#### preSiblings()

#### getCss()

#### css()

#### insertAfter()

#### siblings()

#### offset()

#### addEvent()

#### text()

#### removeEvent()

#### on()

#### off()

