// 参数设计
function Calendar(wrapId, year, month) {
	this.init(wrapId);
}

Calendar.prototype.init = function(wrapId) {
	var elem = document.getElementById(wrapId);
	this.cHeader = elem.querySelector('.calendar-header');
	this.dateTitle = elem.querySelector('.cur-date')
	this.outputTime = document.querySelector('.show-time')
	this.event();
	this.getTime();
//	this.select();
}

Calendar.prototype.getTime = function() {
	var now = new Date();
	var nY = now.getFullYear();
	var nM = now.getMonth() + 1;
	var nD = now.getDate();
	var nH = now.getHours();
	var nMinu = now.getMinutes();
	var nS = now.getSeconds();
	var week = now.getDay();
	this.selectYear = nY;
	this.selectMonth = nM;
	this.selectDate = nD;
	// 获取当前月份的天数
	this.getMonthDays(this.selectYear, this.selectMonth);
}

// 获取每月的天数
Calendar.prototype.getMonthDays = function(year, month) {
	this.showList = [];
	// 当前月份最后一天
	let date = new Date(year, month, 0);
	this.dayNum = date.getDate(); 
	// 当前月份第一天
	date.setDate(1);
	this.firstDay = date.getDay();
	// 补全日历第一行每月一号前面的项
	for(let i=0; i<this.firstDay; i++) {
		this.showList.push('');
	}
	for(let i=1; i<=this.dayNum; i++) {
		this.showList.push(i);
	}
	this.show();
	console.log('当前月份天数是：', this.dayNum, this.firstDay);
}

// 展示日历item
Calendar.prototype.show = function() {
	let elemUl = document.querySelector('.calendar-day-item');
	let fragment = document.createDocumentFragment();
	
	this.title = this.selectYear+'年'+this.selectMonth+'月';
	if(elemUl.hasChildNodes()) {
		elemUl.innerHTML = '';
	}
	let len = this.showList.length;
	for(let i=0; i< len; i++) {
		let li = document.createElement('li');
		li.className = 'calendar-panel-item';
		li.appendChild(document.createTextNode(this.showList[i]));
		fragment.appendChild(li);
	}
	elemUl.appendChild(fragment);
	this.dateTitle.innerHTML = this.title;
	this.select();
}

Calendar.prototype.event = function() {
	this.items = null;
	let changeItem = document.querySelector('.calendar-header');
	let that = this;
	changeItem.addEventListener('click', function(e) {
		let target = e.target.className;
		switch(target) {
			case 'forward':
				that.selectMonth--;
				if(that.selectMonth <= 0){
					that.selectMonth = 12;
					that.selectYear--;
				}
				that.getMonthDays(that.selectYear, that.selectMonth)
				break;
			case 'cur-date':
				// do something
				break;
			case 'next':
				that.selectMonth++;
				if(that.selectMonth > 12){
					that.selectMonth = 1;
					that.selectYear++;
				}
				that.getMonthDays(that.selectYear, that.selectMonth)
				break;
			default:
				// do something
				break;
		};
	});
}

Calendar.prototype.select = function() {
	let that = this;
	this.items = document.querySelectorAll('.calendar-panel-item');
	let len = this.items.length;
	for(let i=0; i<len; i++) {
		this.items[i].addEventListener('click', function(e) {
			console.dir(e.target)
			that.selectDate = e.target.innerText;
			if(!that.selectDate) {
				return;
			}
			if(typeof that.index === 'number') {
				that.items[that.index].classList.remove('active');
				console.log(that.index);
			}
			this.classList.add('active');
			that.dateTitle.innerHTML = that.title;
			that.outputTime.innerHTML = '';
			// 这里单纯的只是为了试用createTextNode()
			that.outputTime.appendChild(document.createTextNode(that.title + that.selectDate));
			that.index = i;
		});
	}
}
// 补零函数
function addZero(num) {
	if(num < 10){
		num = '0' + num;
	}
	return num;
}

new Calendar('calendar');
