// Handling interactions with button groups
const buttonGroups = document.querySelectorAll('.button-group');

buttonGroups.forEach((buttonGroup) => {
	const buttons = buttonGroup.querySelectorAll('button');

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			buttons.forEach((button) => {
				button.classList.remove('active');
			});
			button.classList.add('active');
		});
	});
});

// Handling interactions with dropdown picker, and option buttons
const dropdowns = document.querySelectorAll('.dropdown-container');

dropdowns.forEach((dropdown) => {
	const picker = dropdown.querySelector('.dropdown-picker');
	const pickerTextEl = picker.querySelector('.text');
	const optionList = dropdown.querySelector('.dropdown-option-list');
	const options = dropdown.querySelectorAll('.dropdown-option-list .dropdown-option');

	picker.addEventListener('click', () => {
		// Add the active styles to the dropdown-option-list element
		optionList.classList.toggle('active');
	});

	options.forEach((option) => {
		option.addEventListener('click', () => {
			const optionTextEl = option.querySelector('.text');
			pickerTextEl.innerText = optionTextEl.innerText;
			optionList.classList.remove('active');
		});
	});
});
