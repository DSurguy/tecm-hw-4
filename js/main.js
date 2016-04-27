window.Learning = {
	modules: []
};

window.onload = function (){
	var learningModules = $('[data-module=learning]');

	window.LearningModule.modules = learningModules.map(function (index, item){
		return new LearningModule(item);
	});
};