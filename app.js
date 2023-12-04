/**
 *
 *
 * @param {String} html HTML string that will be converted to a HTML element
 * @returns {Element} HTML element of @param {String} html
 */
function elementFromHtml(html) {
	const template = document.createElement('template');

	template.innerHTML = html.trim();

	return template.content.firstElementChild;
}

//
//
// Button-groups

const buttonGroups = document.querySelectorAll('.button-group');
buttonGroups.forEach((buttonGroup) => {
	var buttons = buttonGroup.querySelectorAll('button');

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			buttons.forEach((button) => {
				// Sets all button states, in button-group to '' (default)
				button.removeAttribute('data-state');
			});
			// Sets the selected button state to 'selected'
			button.dataset.state = 'selected';
		});
	});

	// First button always selected by default
	buttons[0].dataset.state = 'selected';
});

//
//
// Dropdowns

function updateDropdownWrapper(dropdown) {
	var dropdownOptionsMenu = dropdown.querySelector('.button-group.dropdown-options-menu');

	if (dropdown.dataset.state === 'closed') {
		dropdownOptionsMenu.dataset.visibility = 'hidden';
	} else if (dropdown.dataset.state === 'open') {
		dropdownOptionsMenu.dataset.visibility = 'visible';
	}

	var dropdownPickerButton = dropdown.querySelector('button.dropdown.picker');
	var text_to_change = dropdownPickerButton.childNodes[0];
	text_to_change.nodeValue = dropdown.dataset.selectedOption;
}

function closeDropdown(dropdown) {
	dropdown.dataset.state = 'closed';
	updateDropdownWrapper(dropdown);
}

function openDropdown(dropdown) {
	dropdown.dataset.state = 'open';
	updateDropdownWrapper(dropdown);
}

function toggleDropdownState(dropdown) {
	if (dropdown.dataset.state === 'open') {
		closeDropdown(dropdown);
	} else if (dropdown.dataset.state === 'closed') {
		openDropdown(dropdown);
	}
}

const dropdownWrappers = document.querySelectorAll('.wrapper.dropdown');
dropdownWrappers.forEach((dropdown) => {
	// all "dropdown-options-menu"s are closed by default
	closeDropdown(dropdown);

	var dropdownOptions = dropdown.querySelectorAll('button.dropdown.option');
	dropdownOptions.forEach((dropdownOptionButton) => {
		dropdownOptionButton.dataset.option = dropdownOptionButton.textContent;

		// sets the selected-option of the dropdown
		if (dropdownOptionButton.dataset.state === 'selected') {
			dropdown.dataset.selectedOption = dropdownOptionButton.dataset.option;
			updateDropdownWrapper(dropdown);
		}
	});
});

document.addEventListener('click', (e) => {
	const clickedDropdownOptionsMenu = e.target.closest('.wrapper.dropdown-options-menu');
	const clickedDropdownPickerButton = e.target.closest('button.dropdown.picker');
	const clickedDropdownOptionButton = e.target.closest('button.dropdown.option');

	if (!clickedDropdownOptionsMenu && !clickedDropdownPickerButton) {
		// close all dropdowns when dropdowns aren't focused
		dropdownWrappers.forEach((dropdown) => {
			closeDropdown(dropdown);
		});
	}
	let currentDropdownWrapper;
	if (clickedDropdownPickerButton) {
		// toggle dropdown state (open/closed)
		currentDropdownWrapper = clickedDropdownPickerButton.parentNode;
		toggleDropdownState(currentDropdownWrapper);

		// close all other dropdowns
		dropdownWrappers.forEach((dropdown) => {
			if (dropdown !== currentDropdownWrapper) {
				closeDropdown(dropdown);
			}
		});
	}
	if (clickedDropdownOptionButton) {
		currentDropdownOptionsMenu = clickedDropdownOptionButton.parentNode;
		currentDropdownWrapper = currentDropdownOptionsMenu.parentNode;
		closeDropdown(currentDropdownWrapper);

		// updates the selected-option of the dropdown
		currentDropdownWrapper.dataset.selectedOption = clickedDropdownOptionButton.dataset.option;
		updateDropdownWrapper(currentDropdownWrapper);
	}
});

//
//
// Inputs

const inputWrappers = document.querySelectorAll('.wrapper.input');
inputWrappers.forEach((inputWrapper) => {
	var input = inputWrapper.querySelector('input');
	inputWrapper.addEventListener('mouseover', () => {
		input.classList.remove('autoSize');
		input.removeAttribute('style');
	});
	inputWrapper.addEventListener('mouseout', () => {
		input.classList.add('autoSize');
		onInputDelegate({ target: input });
	});
});

//
//
// Direction Wrapper

function updateDirectionButtonGroup(buttonGroup) {
	let directionOptions = buttonGroup.querySelectorAll('button.direction');
	directionOptions.forEach((directionOptionButton) => {
		// sets the selected-option of the direction button-group
		if (directionOptionButton.dataset.state === 'selected') {
			let directionButtonGroup = directionOptionButton.parentNode;
			directionButtonGroup.dataset.selectedOption = directionOptionButton.dataset.option;
		}
	});
}

const directionWrappers = document.querySelectorAll('.wrapper.direction');
directionWrappers.forEach((directionWrapper) => {
	let directionOptions = directionWrapper.querySelectorAll('button.direction');

	directionOptions.forEach((directionOptionButton) => {
		directionOptionButton.addEventListener('click', () => {
			updateDirectionButtonGroup(directionWrapper);
		});
	});

	updateDirectionButtonGroup(directionWrapper);
});

//
//
// Alignment Wrapper

function updateAlignmentButtonGroup(buttonGroup) {
	let alignmentOptions = buttonGroup.querySelectorAll('button.alignment');
	alignmentOptions.forEach((alignmentOptionButton) => {
		// sets the selected-option of the alignment button-group
		if (alignmentOptionButton.dataset.state === 'selected') {
			let alignmentSelectedOption = `column-${alignmentOptionButton.dataset.column}, row-${alignmentOptionButton.dataset.row}`;
			buttonGroup.dataset.selectedOption = alignmentSelectedOption;
		}
	});
}

const alignmentWrappers = document.querySelectorAll('.wrapper.alignment');
alignmentWrappers.forEach((alignmentWrapper) => {
	var alignmentOptions = alignmentWrapper.querySelectorAll('button.alignment');
	let columnIndex = 0;
	let rowIndex = 0;
	alignmentOptions.forEach((alignmentOptionButton, index) => {
		columnIndex = (index % 3) + 1;
		if (index % 3 == 0) {
			rowIndex++;
		}
		alignmentOptionButton.dataset.column = columnIndex;
		alignmentOptionButton.dataset.row = rowIndex;

		alignmentOptionButton.addEventListener('click', () => {
			updateAlignmentButtonGroup(alignmentWrapper);
		});
	});
	updateAlignmentButtonGroup(alignmentWrapper);
});

//
//
// Alignment Buttons

const alignmentButtons = document.querySelectorAll('button.alignment');
alignmentButtons.forEach((alignmentButton) => {
	alignmentButton.addEventListener('mouseover', () => {
		if (!alignmentButton.dataset.state) {
			alignmentButton.dataset.state = 'hovering';
		}
	});
	alignmentButton.addEventListener('mouseout', () => {
		if (alignmentButton.dataset.state === 'hovering') {
			alignmentButton.removeAttribute('data-state');
		}
	});

	// alignmentButton.innerHTML = '<span class="icon-circle-small"></span>';
});

//
//
// Direction and Alignment

function updateDAAWrapper(dAAWrapper) {
	var directionWrapper = dAAWrapper.querySelector('.wrapper.direction');
	dAAWrapper.dataset.direction = directionWrapper.dataset.selectedOption;
	var alignmentWrapper = dAAWrapper.querySelector('.wrapper.alignment');
	dAAWrapper.dataset.alignment = alignmentWrapper.dataset.selectedOption;

	updateAlignmentOptionButtonIcon(dAAWrapper);
}

function updateAlignmentOptionButtonIcon(dAAWrapper) {
	var alignmentOptions = dAAWrapper.querySelectorAll('button.alignment');
	var iconHtml = {
		'h-left': '<span class="icon-alignment-horizontal-left"></span><span class="icon-circle-small"></span>',
		'h-center': '<span class="icon-alignment-horizontal-center"></span><span class="icon-circle-small"></span>',
		'h-right': '<span class="icon-alignment-horizontal-right"></span><span class="icon-circle-small"></span>',
		'h-left-r': '<span class="icon-alignment-horizontal-left-reverse"></span><span class="icon-circle-small"></span>',
		'h-center-r': '<span class="icon-alignment-horizontal-center-reverse"></span><span class="icon-circle-small"></span>',
		'h-right-r': '<span class="icon-alignment-horizontal-right-reverse"></span><span class="icon-circle-small"></span>',
		'v-top': '<span class="icon-alignment-vertical-top"></span><span class="icon-circle-small"></span>',
		'v-center': '<span class="icon-alignment-vertical-center"></span><span class="icon-circle-small"></span>',
		'v-bottom': '<span class="icon-alignment-vertical-bottom"></span><span class="icon-circle-small"></span>',
		'v-top-r': '<span class="icon-alignment-vertical-top-reverse"></span><span class="icon-circle-small"></span>',
		'v-center-r': '<span class="icon-alignment-vertical-center-reverse"></span><span class="icon-circle-small"></span>',
		'v-bottom-r': '<span class="icon-alignment-vertical-bottom-reverse"></span><span class="icon-circle-small"></span>',
	};

	alignmentOptions.forEach((alignmentButton) => {
		// alignmentButton.innerHTML = '<span class="icon-circle-small"></span>';
		if (dAAWrapper.dataset.direction === 'column') {
			if (alignmentButton.dataset.column === '1') {
				alignmentButton.innerHTML = iconHtml['h-left'];
			} else if (alignmentButton.dataset.column === '2') {
				alignmentButton.innerHTML = iconHtml['h-center'];
			} else if (alignmentButton.dataset.column === '3') {
				alignmentButton.innerHTML = iconHtml['h-right'];
			}
		} else if (dAAWrapper.dataset.direction === 'row') {
			if (alignmentButton.dataset.row === '1') {
				alignmentButton.innerHTML = iconHtml['v-top'];
			} else if (alignmentButton.dataset.row === '2') {
				alignmentButton.innerHTML = iconHtml['v-center'];
			} else if (alignmentButton.dataset.row === '3') {
				alignmentButton.innerHTML = iconHtml['v-bottom'];
			}
		} else if (dAAWrapper.dataset.direction === 'column-reverse') {
			if (alignmentButton.dataset.column === '1') {
				alignmentButton.innerHTML = iconHtml['h-left-r'];
			} else if (alignmentButton.dataset.column === '2') {
				alignmentButton.innerHTML = iconHtml['h-center-r'];
			} else if (alignmentButton.dataset.column === '3') {
				alignmentButton.innerHTML = iconHtml['h-right-r'];
			}
		} else if (dAAWrapper.dataset.direction === 'row-reverse') {
			if (alignmentButton.dataset.row === '1') {
				alignmentButton.innerHTML = iconHtml['v-top-r'];
			} else if (alignmentButton.dataset.row === '2') {
				alignmentButton.innerHTML = iconHtml['v-center-r'];
			} else if (alignmentButton.dataset.row === '3') {
				alignmentButton.innerHTML = iconHtml['v-bottom-r'];
			}
		}
	});
}

const directionAndAlignmentWrappers = document.querySelectorAll('.wrapper.direction-and-alignment');
directionAndAlignmentWrappers.forEach((dAAWrapper) => {
	var directionOptions = dAAWrapper.querySelectorAll('button.direction');
	directionOptions.forEach((directionOptionButton) => {
		directionOptionButton.addEventListener('click', () => {
			updateDAAWrapper(dAAWrapper);

			// update direction of alignment icons
		});
	});
	var alignmentOptions = dAAWrapper.querySelectorAll('button.alignment');
	alignmentOptions.forEach((alignmentOptionButton) => {
		alignmentOptionButton.addEventListener('click', () => {
			updateDAAWrapper(dAAWrapper);
		});
	});
	updateDAAWrapper(dAAWrapper);
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

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
	input.classList.add('autoSize');
	onInputDelegate({ target: input });
});
