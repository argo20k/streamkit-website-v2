// Button-groups
const buttonGroups = document.querySelectorAll('.button-group');
buttonGroups.forEach((buttonGroup) => {
	const buttons = buttonGroup.querySelectorAll('button');

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			buttons.forEach((button) => {
				// Removes active styles for button
				button.classList.remove('active');
			});
			// Adds active styles for button
			button.classList.add('active');
		});
	});
});

// Dropdowns
const dropdowns = document.querySelectorAll('.dropdown-container');
dropdowns.forEach((dropdown) => {
	const picker = dropdown.querySelector('.dropdown.picker');
	const pickerTextEl = picker.querySelector('.text');
	const optionsMenu = dropdown.querySelector('.dropdown-options-menu');
	const options = dropdown.querySelectorAll('.dropdown-options-menu .dropdown.option');

	picker.addEventListener('click', () => {
		// Toggles open styles for dropdown-options-menu
		optionsMenu.classList.toggle('open');
	});

	options.forEach((option) => {
		// Triggers when an option is selecte from the optionsMenu
		option.addEventListener('click', () => {
			const optionTextEl = option.querySelector('.text');
			// Sets dropdown-picker text to the text of the chosen dropdown-option
			pickerTextEl.innerText = optionTextEl.innerText;

			// Removes open styles for dropdown-options-menu
			optionsMenu.classList.remove('open');
		});
	});
});

// Direction Buttons + Alignment Button-group Links
const directionButtons = document.querySelectorAll('.button-group.direction button');
const alignmentButtonGroup = document.querySelector('.button-group.alignment');
directionButtons.forEach((directionButton) => {
	directionButton.addEventListener('click', () => {
		// Removes vertical + horizontal + reverse styles, if enabled
		alignmentButtonGroup.classList.remove('vertical');
		alignmentButtonGroup.classList.remove('horizontal');
		alignmentButtonGroup.classList.remove('reverse');

		// Adds appropriate styles for respective direction buttons that are clicked
		if (directionButton.id === 'row') {
			alignmentButtonGroup.classList.add('vertical');
		} else if (directionButton.id === 'row-reverse') {
			alignmentButtonGroup.classList.add('vertical');
			alignmentButtonGroup.classList.add('reverse');
		} else if (directionButton.id === 'column') {
			alignmentButtonGroup.classList.add('horizontal');
		} else if (directionButton.id === 'column-reverse') {
			alignmentButtonGroup.classList.add('horizontal');
			alignmentButtonGroup.classList.add('reverse');
		}
	});
});
