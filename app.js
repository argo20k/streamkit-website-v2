// Button-groups
// set active state for buttons in button-groups
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
// set open state for dropdown-options-menu for dropdown-pickers that are clicked
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

// - whenever a direction button is clicked - gets the active direction
// - changes the state of alignment accordingly
const directionButtons = document.querySelectorAll('.button-group.direction button');
const alignmentButtonGroup = document.querySelector('.button-group.alignment');
directionButtons.forEach((directionButton) => {
	// whenever a direction button is clicked
	directionButton.addEventListener('click', () => {
		// remove the current direction from .button-group.alignment -> so that the new one that is active can be added
		directionButtons.forEach((directionButton) => {
			alignmentButtonGroup.classList.remove(directionButton.id);
		});

		// get the active direction from the direction-button-group
		directionButtons.forEach((directionButton) => {
			if (directionButton.classList.contains('active')) {
				alignmentButtonGroup.classList.add(directionButton.id);
			}
		});
	});
});

// Wrappers
const wrappers = document.querySelectorAll('.wrapper');
wrappers.forEach((wrapper) => {
	// Text Input
	const inputs = wrapper.querySelectorAll('input[type="text"]');
	inputs.forEach((input) => {
		wrapper.addEventListener('mouseover', () => {
			input.classList.remove('autoSize');
			input.removeAttribute('style');
		});
		wrapper.addEventListener('mouseout', () => {
			input.classList.add('autoSize');
			onInputDelegate({ target: input });
		});
	});
});

// Submenus
const submenus = document.querySelectorAll('.submenu-container');
submenus.forEach((dropdown) => {
	const header = dropdown.querySelector('.submenu.header');
	const container = dropdown.querySelector('.submenu.container');

	const expand_button = header.querySelector('.shape-group.expand');

	expand_button.addEventListener('click', () => {
		// Toggles open styles for dropdown-options-menu
		container.classList.toggle('open');
		expand_button.classList.toggle('more');
		expand_button.classList.toggle('less');
	});
});

//
//
//
//
//
//
//
//
//
//

var getInputValueWidth = (function () {
	// https://stackoverflow.com/a/49982135/104380
	function copyNodeStyle(sourceNode, targetNode) {
		var computedStyle = window.getComputedStyle(sourceNode);
		Array.from(computedStyle).forEach((key) => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)));
	}

	function createInputMeassureElm(inputelm) {
		// create a dummy input element for measurements
		var meassureElm = document.createElement('span');
		// copy the read input's styles to the dummy input
		copyNodeStyle(inputelm, meassureElm);

		// set hard-coded styles needed for propper meassuring
		meassureElm.style.width = 'auto';
		meassureElm.style.position = 'absolute';
		meassureElm.style.left = '-9999px';
		meassureElm.style.top = '-9999px';
		meassureElm.style.whiteSpace = 'pre';

		meassureElm.textContent = inputelm.value || '';

		// add the meassure element to the body
		document.body.appendChild(meassureElm);

		return meassureElm;
	}

	return function () {
		return createInputMeassureElm(this).offsetWidth;
	};
})();

// delegated event binding
document.body.addEventListener('input', onInputDelegate);

function onInputDelegate(e) {
	if (e.target.classList.contains('autoSize')) e.target.style.width = getInputValueWidth.call(e.target) + 'px';
}

for (let input of document.querySelectorAll('input')) onInputDelegate({ target: input });
