function LearningModule (moduleElem){
	this.container;
	this.form;
	this.inputName;

	this._init(moduleElem);
};

LearningModule.prototype._init = function (moduleElem){
	this.container = $(moduleElem);
	this.correctAnswer = this.container.attr('data-answer');
	this.form = this.container.find('form');
	this.inputName = this.form.find('[name]')[0].getAttribute('name');

	this._bindEvents();
};

LearningModule.prototype._bindEvents = function (){
	var that = this;
	this.form.on('click', '.submit', function (e){
		that.validateAnswer();
	});

	this.form.on('submit', function (e){
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	this.form.on('change', 'input', function (e){
		that.container.find('.response').remove();
	});

	this.container.on('click', '.learn-why-button', function (e){
		$(this).siblings('.why-message').toggleClass('hidden');
		if( $(this).find('.text').text() == 'Learn Why' ){
			$(this).find('.text').html('Hide');
		}
		else{
			$(this).find('.text').html('Learn Why');
		}
	});
};

LearningModule.prototype.validateAnswer = function (){
	if( this.form[0][this.inputName].value == this.correctAnswer ){
		this._updateResponse(true, '');
	}
	else{
		this._updateResponse(false, '');
	}
};

LearningModule.prototype._updateResponse = function (isValid, why){
	this.container.find('.response').remove();
	this.container.find('.panel-body').append('<div class="response alert"></div>');
	var response = this.container.find('.response');
	response.addClass(isValid?'alert-success':'alert-danger');
	if( isValid ){
		response.addClass('alert-success');
		response.prepend('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
		response.append('<span class="message">&nbsp;Correct!</span>');
		if( this.form.find('.why') ){
			response.find('.message').append('<br><br><button type="button" class="btn btn-success btn-xs learn-why-button"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span> <span class="text">Learn Why</span></button>');
			response.find('.message').append('<span class="why-message hidden">&nbsp;'+this._getWhyMessage()+'</span>');
		}
	}
	else{
		response.addClass('alert-danger');
		response.prepend('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
		response.append('<span class="message">&nbsp;Incorrect.</span>');
		if( this.form.find('.why') ){
			response.find('.message').append('<br><br><button type="button" class="btn btn-danger btn-xs learn-why-button"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span> <span class="text">Learn Why</span></button>');
			response.find('.message').append('<span class="why-message hidden">&nbsp;'+this._getWhyMessage()+'</span>');
		}
	}
};

LearningModule.prototype._getWhyMessage = function (){
	var that = this;
	var why = this.container.find('.why .why-text:not([default])').filter(function (index, item){
		if( $(item).find('[data-value]').html().trim() == that.correctAnswer ){
			return true;
		}
		return false;
	});

	if( why ){
		return why.find('[data-text]').html().trim();
	}
	else{
		return this.container.find('.why .why-text[default] [data-text]').html().trim();
	}
};