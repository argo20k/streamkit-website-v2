//
//
// buttons

// submenus.buttons
const visbilityIconsHtml = {
	visible: '<span class="icon-visibility-on"></span>',
	hidden: '<span class="icon-visibility-off"></span>',
};
const submenuArrowIconsHtml = {
	less: '<span class="icon-drop-arrow-right"></span>',
	more: '<span class="icon-drop-arrow-down"></span>',
};

var observer8 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-state') {
				if (mutation.target.dataset.state === 'inactive') {
					mutation.target.innerHTML = visbilityIconsHtml['visible'];
				} else if (mutation.target.dataset.state === 'active') {
					mutation.target.innerHTML = visbilityIconsHtml['hidden'];
				}
			}
		}
	});
});
var observer9 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-state') {
				if (mutation.target.dataset.state === 'inactive') {
					mutation.target.innerHTML = submenuArrowIconsHtml['less'];
				} else if (mutation.target.dataset.state === 'active') {
					mutation.target.innerHTML = submenuArrowIconsHtml['more'];
				}
			}
		}
	});
});

function getButtonsWithoutClasses() {
	return document.querySelectorAll('button:not([class])');
}

function setButtonData() {
	var buttonsWithoutClasses = getButtonsWithoutClasses();

	buttonsWithoutClasses.forEach((buttonWithoutClasses) => {
		// add default button data depending on button type

		var textContentArray = buttonWithoutClasses.textContent.split(',').map(function (item) {
			return item.trim();
		});
		var iconName;
		var dataValue;
		var classNames = [];
		var html;
		var id;

		textContentArray.forEach((buttonData) => {
			if (/value-/i.test(buttonData)) {
				dataValue = buttonData.replace(/value-/i, '');
			}
			if (/icon-/i.test(buttonData)) {
				classNames.push('icon');
				iconName = buttonData.toLowerCase();
				html = `<span class="${iconName}"></span>`;
			}
			if (/extraClasses-/i.test(buttonData)) {
				if (/submenu-arrow/i.test(buttonData)) {
					classNames.push('submenu-arrow');
				} else if (/submenu-visibility/i.test(buttonData)) {
					classNames.push('submenu-visibility');
				}
			}
			if (/id-/i.test(buttonData)) {
				id = buttonData.replace(/id-/i, '');
			}

			if (/type-/i.test(buttonData)) {
				if (/dropdown-picker/i.test(buttonData)) {
					classNames.push('dropdown-picker');
					html = `Select an Option<span class="icon-expand-more"></span>`;
				} else if (/checkbox/i.test(buttonData)) {
					classNames.push('checkbox');
					html = `<span class="icon-check"></span>`;
				} else if (/alignment/i.test(buttonData)) {
					classNames.push('icon');
					classNames.push('alignment');
					html = `<span class="icon-square-cropped"></span>`;
				} else if (/submenu/i.test(buttonData)) {
					classNames.push('submenu');
				} else if (/dropdownOption/i.test(buttonData)) {
					classNames.push('dropdown-option');
					html = `<span class="icon-check"></span>Option HTML`;
					textContentArray.forEach((buttonData) => {
						if (/html-/i.test(buttonData)) {
							html = `<span class="icon-check"></span>${buttonData.replace(/html-/i, '')}`;
						}
					});
				} else if (/text/i.test(buttonData)) {
					classNames.push('text');
					html = 'Button HTML';
					textContentArray.forEach((buttonData) => {
						if (/html-/i.test(buttonData)) {
							html = buttonData.replace(/html-/i, '');
						}
					});
				} else if (/addElement/i.test(buttonData)) {
					classNames.push('add-element');
					textContentArray.forEach((buttonData) => {
						if (/html-/i.test(buttonData)) {
							html = `<span class="icon-add"></span>${buttonData.replace(/html-/i, '')}`;
						}
					});
				}
			}
		});

		// this order is important, so data and class attributes don't get redefined by innerHTML line
		buttonWithoutClasses.innerHTML = html;
		if (dataValue) buttonWithoutClasses.dataset.value = dataValue;
		if (id) buttonWithoutClasses.id = id;

		classNames.forEach((className) => {
			buttonWithoutClasses.classList.add(className);
		});

		if (buttonWithoutClasses.classList.contains('submenu-visibility')) {
			var visbilityButton = buttonWithoutClasses;
			// add data-state observer to visiblity.buttons
			// updates visiblity.buttons innerHTML
			observer8.observe(visbilityButton, {
				attributes: true,
			});

			visbilityButton.dataset.state = 'active';
		}
		if (buttonWithoutClasses.classList.contains('submenu-arrow')) {
			var submenuArrowButton = buttonWithoutClasses;
			// add data-state observer to submenu-arrow.buttons
			// updates submenu-arrow.buttons innerHTML
			observer9.observe(submenuArrowButton, {
				attributes: true,
			});
		}

		buttonWithoutClasses.dataset.state = 'inactive';

		if (!buttonWithoutClasses.parentNode.classList.contains('button-group')) {
			buttonWithoutClasses.addEventListener('click', () => {
				if (buttonWithoutClasses.dataset.state === 'inactive') {
					buttonWithoutClasses.dataset.state = 'active';
				} else if (buttonWithoutClasses.dataset.state === 'active') {
					buttonWithoutClasses.dataset.state = 'inactive';
				}
			});
		}
	});
}

setButtonData();

//
//
//  button-group + button-group.buttons

var observer1 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.target.dataset.state === 'active') {
				mutation.target.parentNode.dataset.selectedButton = mutation.target.dataset.value;
			}
		}
	});
});

// button-group
const buttonGroupWrappers = document.querySelectorAll('.wrapper.button-group');
buttonGroupWrappers.forEach((buttonGroupWrapper) => {
	// button-group.buttons
	var buttonGroupButtons = buttonGroupWrapper.querySelectorAll('button');
	buttonGroupButtons.forEach((buttonGroupButton) => {
		buttonGroupButton.addEventListener('click', () => {
			buttonGroupButtons.forEach((buttonGroupButton2) => {
				// for the other buttons that weren't clicked
				// Sets all button states, in button-group to '' (default)
				if (buttonGroupButton2 !== buttonGroupButton) {
					if (buttonGroupButton2.dataset.state === 'active') {
						buttonGroupButton2.dataset.state = 'inactive';
					}
				}
			});
			// Sets the selected button state to 'selected'
			if (buttonGroupButton.dataset.state === 'inactive') {
				buttonGroupButton.dataset.state = 'active';
			}
		});

		observer1.observe(buttonGroupButton, {
			attributes: true,
		});
	});

	buttonGroupButtons[0].dataset.state = 'active';
});

//
//
// dropdowns

function updateDropdownWrapperDataExpanded(dropdownPickerButton) {
	var dropdownWrapper = dropdownPickerButton.parentNode;
	if (dropdownPickerButton.dataset.state === 'active') {
		dropdownWrapper.dataset.expanded = 'true';
	} else if (dropdownPickerButton.dataset.state === 'inactive') {
		dropdownWrapper.dataset.expanded = 'false';
	}
}

var observer2 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-state') {
				updateDropdownWrapperDataExpanded(mutation.target);
			}
		}
	});
});
var observer3 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		var dropdownWrapper = mutation.target.parentNode;
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-selected-button') {
				dropdownWrapper.dataset.selectedOption = mutation.target.dataset.selectedButton;
			}
		}
	});
});
var observer4 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		var dropdownPickerButton = mutation.target.querySelector('button.dropdown-picker');
		var dropdownOptionsMenuButtonGroup = mutation.target.querySelector('.wrapper.dropdown-options-menu');
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-expanded') {
				if (mutation.target.dataset.expanded === 'true') {
					dropdownOptionsMenuButtonGroup.dataset.visibility = 'visible';

					// makes sure dropdown menu stays in broser frame
					var screenWidth = Math.max(document.documentElement['clientWidth']);
					var elementRect = dropdownOptionsMenuButtonGroup.getBoundingClientRect();
					var elementMarginLeft = Number(dropdownOptionsMenuButtonGroup.style.getPropertyValue('margin-left').replace('px', ''));
					var elementRight = Math.floor(elementRect.right - elementMarginLeft);
					if (elementRight > screenWidth) {
						dropdownOptionsMenuButtonGroup.style.marginLeft = `-${elementRight - screenWidth}px`;
					} else {
						dropdownOptionsMenuButtonGroup.style.marginLeft = `0px`;
					}
				} else if (mutation.target.dataset.expanded === 'false') {
					dropdownOptionsMenuButtonGroup.dataset.visibility = 'hidden';
				}
			} else if (mutation.attributeName === 'data-selected-option') {
				dropdownPickerButton.innerHTML = `${mutation.target.dataset.selectedOption}<span class="icon-expand-more"></span>`;
			}
		}
	});
});

const dropdownWrappers = document.querySelectorAll('.wrapper.dropdown');
dropdownWrappers.forEach((dropdownWrapper) => {
	var dropdownPickerButton = dropdownWrapper.querySelector('button.dropdown-picker');
	var dropdownOptionsMenuButtonGroup = dropdownWrapper.querySelector('.wrapper.dropdown-options-menu');

	//	add data-state observer to dropdown-picker.button
	//	updates dropdown.wrapper data-expanded
	observer2.observe(dropdownPickerButton, {
		attributes: true,
	});

	// 	add data-selected-button observer to dropdown-options-menu.button-group
	//	updates dropdown.wrapper data-selected-option
	observer3.observe(dropdownOptionsMenuButtonGroup, {
		attributes: true,
	});

	// 	add data-expanded observer to dropdown.wrapper
	//	updates dropdown-options-menu.button-group data-visibility
	//
	// 	add data-selected-option observer to dropdown.wrapper
	//	updates dropdown-picker.button innerHTML
	observer4.observe(dropdownWrapper, {
		attributes: true,
	});

	updateDropdownWrapperDataExpanded(dropdownPickerButton);
});

function deactivateButton(button) {
	if (button.dataset.state === 'active') {
		button.dataset.state = 'inactive';
	}
}

// deactivating appropraite dropdown-picker.buttons when clicking outside dropdown.button-groups
const dropdownPickerButtons = document.querySelectorAll('button.dropdown-picker');
document.addEventListener('click', (e) => {
	var clickedElement = e.target;
	var clickedDropdownOptionsMenu = clickedElement.matches('.wrapper.dropdown-options-menu');
	var clickedDropdownPickerButton;
	// if clicked element isn't an option-menu -> deactivate all pickers, unless it's the picker that was clicked
	if (!clickedDropdownOptionsMenu) {
		// clickedDropdownPickerButton will be reassigned if it was clicked
		if (clickedElement.closest('button.dropdown-picker')) {
			while (!clickedElement.classList.contains('dropdown-picker')) {
				clickedElement = clickedElement.parentNode;
			}
			clickedDropdownPickerButton = clickedElement;
		}

		dropdownPickerButtons.forEach((dropdownPickerButton) => {
			// deactivates all dropdownPickerButtons -> unless it's the one that was clicked
			if (dropdownPickerButton !== clickedDropdownPickerButton) {
				deactivateButton(dropdownPickerButton);
			}
		});
	}
});

//
//
// direction-and-alignments

var observer5 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		var dAAWrapper = mutation.target.parentNode;
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-selected-button') {
				dAAWrapper.dataset.direction = mutation.target.dataset.selectedButton;
			}
		}
	});
});
var observer6 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		var alignmentButtons = mutation.target.querySelectorAll('button.alignment');
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-direction') {
				alignmentButtons.forEach((alignmentButton) => {
					alignmentButton.dataset.direction = mutation.target.dataset.direction;
				});
			}
		}
	});
});
var observer13 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		var dAAWrapper = mutation.target.parentNode;
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-selected-button') {
				dAAWrapper.dataset.alignment = mutation.target.dataset.selectedButton;
			}
		}
	});
});

const directionAndAlignmentContainers = document.querySelectorAll('.container.direction-and-alignment');
directionAndAlignmentContainers.forEach((directionAndAlignmentContainer) => {
	var dAAWrapper = directionAndAlignmentContainer;
	var directionButtonGroup = dAAWrapper.querySelector('.wrapper.button-group.direction');
	var alignmentButtonGroup = dAAWrapper.querySelector('.wrapper.button-group.alignment');

	// add data-selected-button observer to direction.button-group
	// updates direction-and-alignment.wrapper data-direction
	observer5.observe(directionButtonGroup, {
		attributes: true,
	});

	// add data-direction observer to direction-and-alignment.wrapper
	// updates alignment.buttons data-direction
	observer6.observe(dAAWrapper, {
		attributes: true,
	});

	// add data-selected-button observer to alignment.button-group
	// updates direction-and-alignment.wrapper data-alignment
	observer13.observe(alignmentButtonGroup, {
		attributes: true,
	});
});

const iconHtml = {
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

var observer7 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-direction') {
				if (mutation.target.dataset.direction === 'column') {
					if (mutation.target.dataset.column === '1') {
						mutation.target.innerHTML = iconHtml['h-left'];
					} else if (mutation.target.dataset.column === '2') {
						mutation.target.innerHTML = iconHtml['h-center'];
					} else if (mutation.target.dataset.column === '3') {
						mutation.target.innerHTML = iconHtml['h-right'];
					}
				} else if (mutation.target.dataset.direction === 'row') {
					if (mutation.target.dataset.row === '1') {
						mutation.target.innerHTML = iconHtml['v-top'];
					} else if (mutation.target.dataset.row === '2') {
						mutation.target.innerHTML = iconHtml['v-center'];
					} else if (mutation.target.dataset.row === '3') {
						mutation.target.innerHTML = iconHtml['v-bottom'];
					}
				} else if (mutation.target.dataset.direction === 'column-reverse') {
					if (mutation.target.dataset.column === '1') {
						mutation.target.innerHTML = iconHtml['h-left-r'];
					} else if (mutation.target.dataset.column === '2') {
						mutation.target.innerHTML = iconHtml['h-center-r'];
					} else if (mutation.target.dataset.column === '3') {
						mutation.target.innerHTML = iconHtml['h-right-r'];
					}
				} else if (mutation.target.dataset.direction === 'row-reverse') {
					if (mutation.target.dataset.row === '1') {
						mutation.target.innerHTML = iconHtml['v-top-r'];
					} else if (mutation.target.dataset.row === '2') {
						mutation.target.innerHTML = iconHtml['v-center-r'];
					} else if (mutation.target.dataset.row === '3') {
						mutation.target.innerHTML = iconHtml['v-bottom-r'];
					}
				}
			}
		}
	});
});

const alignmentWrappers = document.querySelectorAll('.wrapper.alignment');
alignmentWrappers.forEach((alignmentWrapper) => {
	var alignmentButtons = alignmentWrapper.querySelectorAll('button.alignment');
	var columnIndex = 0;
	var rowIndex = 0;

	alignmentButtons.forEach((alignmentButton, index) => {
		columnIndex = (index % 3) + 1;
		if (index % 3 == 0) {
			rowIndex++;
		}
		alignmentButton.dataset.column = columnIndex;
		alignmentButton.dataset.row = rowIndex;
		alignmentButton.dataset.value = `col-${columnIndex} row-${rowIndex}`;

		// add data-direction observer to alignment.buttons
		// updates alignment.buttons innerHTML
		observer7.observe(alignmentButton, {
			attributes: true,
		});
	});
});

//
//
// submenus.buttons + submenus

// submenus
var observer10 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-state') {
				var submenuWrapper = mutation.target.parentNode.parentNode;
				if (mutation.target.dataset.state === 'active') {
					submenuWrapper.dataset.expanded = 'true';
				} else if (mutation.target.dataset.state === 'inactive') {
					submenuWrapper.dataset.expanded = 'false';
				}
			}
		}
	});
});
var observer11 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		var submenuContentWrapper = mutation.target.querySelector('.wrapper.submenu-content');
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-expanded') {
				if (mutation.target.dataset.expanded === 'true') {
					submenuContentWrapper.dataset.visibility = 'visible';
				} else if (mutation.target.dataset.expanded === 'false') {
					submenuContentWrapper.dataset.visibility = 'hidden';
				}
			}
		}
	});
});

const submenuWrappers = document.querySelectorAll('.wrapper.submenu');
submenuWrappers.forEach((submenuWrapper) => {
	var submenuArrowButton = submenuWrapper.querySelector('button.submenu-arrow');

	//	add data-state observer to submenu-arrow.button
	//	updates submenu.wrapper data-expanded
	observer10.observe(submenuArrowButton, {
		attributes: true,
	});

	// 	add data-expanded observer to submenu.wrapper
	//	updates submenu-content.button-group data-visibility
	observer11.observe(submenuWrapper, {
		attributes: true,
	});

	if (submenuArrowButton.dataset.state === 'active') {
		submenuWrapper.dataset.expanded = 'true';
	} else if (submenuArrowButton.dataset.state === 'inactive') {
		submenuWrapper.dataset.expanded = 'false';
	}
});

//
//
// voice-state-selection-specifity

var observer12 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-state') {
				var voiceStateSelectionSpecifityWrapper = mutation.target.parentNode;
				var voiceStateSelectionIdsListWrapper = voiceStateSelectionSpecifityWrapper.querySelector('.wrapper.voice-state-selection-ids-list');
				if (mutation.target.dataset.state === 'active') {
					voiceStateSelectionIdsListWrapper.insertAdjacentHTML(
						'beforeend',
						`
						<div class="wrapper voice-state-selection-id">
							<div class="wrapper input">
								<div class="wrapper prefix">Discord User ID</div>
								<input type="text" value="1234" />
								<div class="wrapper suffix"></div>
							</div>
							<button>type-submenu, icon-square-cropped, extraClasses-submenu-visibility"</button>
							<button>type-submenu, icon-delete</button>
						</div>
						`
					);
					mutation.target.dataset.state = 'inactive';

					// makes sure added buttons have their data set
					setButtonData();
				}
			}
		}
	});
});

const voiceStateSelectionSpecifityWrappers = document.querySelectorAll('.wrapper.voice-state-selection-specifity');
voiceStateSelectionSpecifityWrappers.forEach((voiceStateSelectionSpecifityWrapper) => {
	var addElementButton = voiceStateSelectionSpecifityWrapper.querySelector('button.add-element');

	//	add data-state observer to add-element.button
	//	updates voice-state-selection-ids-list.wrapper -> adds a voice-state-selection-id.wrapper to the list
	observer12.observe(addElementButton, {
		attributes: true,
	});
});

//
//
// inputs + input-wrappers

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
	input.dataset.state = 'inactive';

	input.addEventListener('focusin', () => {
		if (input.dataset.state === 'inactive') {
			input.dataset.state = 'active';
		}
	});

	input.addEventListener('focusout', () => {
		if (input.dataset.state === 'active') {
			input.dataset.state = 'inactive';
		}
	});
});

var observer15 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'data-state') {
				mutation.target.parentNode.dataset.state = mutation.target.dataset.state;
			}
		}
	});
});
var observer16 = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes') {
			var inputElement = mutation.target.parentNode.parentNode.querySelector('input');

			if (mutation.attributeName === 'data-expanded') {
				if (mutation.target.dataset.expanded === 'true') {
					mutation.target.parentNode.parentNode.dataset.state = 'active';
				} else if (mutation.target.dataset.expanded === 'false') {
					if (inputElement.dataset.state !== 'active') {
						mutation.target.parentNode.parentNode.dataset.state = 'inactive';
					}
				}
			} else if (mutation.attributeName === 'data-selected-option') {
				var mathValue = eval(inputElement.value);
				mutation.target.parentNode.parentNode.dataset.value = mathValue + mutation.target.dataset.selectedOption;
			}
		}
	});
});

const inputWrappers = document.querySelectorAll('.wrapper.input');
inputWrappers.forEach((inputWrapper) => {
	var inputElement = inputWrapper.querySelector('input');
	var dropdownWrapper = inputWrapper.querySelector('.wrapper.dropdown');

	//	add data-state observer to input
	//	updates input.wrapper state
	observer15.observe(inputElement, {
		attributes: true,
	});
	inputElement.dataset.state = 'inactive';

	var mathValue = eval(inputElement.value);
	if (dropdownWrapper) {
		//	add data-expanded observer to dropdown.wrapper
		//	updates input.wrapper state
		observer16.observe(dropdownWrapper, {
			attributes: true,
		});

		inputElement.addEventListener('input', () => {
			mathValue = eval(inputElement.value);
			inputWrapper.dataset.value = mathValue + dropdownWrapper.dataset.selectedOption;
		});
		inputWrapper.dataset.value = mathValue + dropdownWrapper.dataset.selectedOption;
	} else {
		inputElement.addEventListener('input', () => {
			mathValue = eval(inputElement.value);
			inputWrapper.dataset.value = mathValue;
		});
		inputWrapper.dataset.value = mathValue;
	}
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

//
//
// preview-CSS

(async function () {
	async function getFile(url) {
		const response = fetch(url);
		return response;
	}

	const defaultPreviewCssText = await (await getFile('styles/00-default.css')).text();
	var currentPreviewCssText = defaultPreviewCssText;

	//
	//
	// updatePreviewCss

	const cssOptions = document.querySelectorAll('.css-option');

	function updatePreviewCss() {
		// generate

		// gets the appropriate data from options
		// generates CSS from data
		cssOptions.forEach((cssOption) => {
			var attributeId = cssOption.id;
			// check attributeId
			// fill custom variables of a huge CSS template accordingly
			if (attributeId !== 'unfinished') {
				if (attributeId === 'voice_states_container_direction_and_alignment') {
					let direction = cssOption.getAttribute('data-direction');
					currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_direction: [^;]*;/i, `--voice_states_container_direction: ${direction};`);
					if (direction === 'column' || direction === 'column-reverse') {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_horizontal_alignment: [^;]*;/i, `--voice_states_horizontal_alignment: var(--voice_states_container_vertical_alignment);`);
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_vertical_alignment: [^;]*;/i, `--voice_states_vertical_alignment: var(--voice_states_container_horizontal_alignment);`);
					} else if (direction === 'row' || direction === 'row-reverse') {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_horizontal_alignment: [^;]*;/i, `--voice_states_horizontal_alignment: var(--voice_states_container_horizontal_alignment);`);
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_vertical_alignment: [^;]*;/i, `--voice_states_vertical_alignment: var(--voice_states_container_vertical_alignment);`);
					}

					let alignment = cssOption.getAttribute('data-alignment');
					if (alignment.includes('col-1')) {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_horizontal_alignment: [^;]*;/i, `--voice_states_container_horizontal_alignment: start;`);
					} else if (alignment.includes('col-2')) {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_horizontal_alignment: [^;]*;/i, `--voice_states_container_horizontal_alignment: center;`);
					} else if (alignment.includes('col-3')) {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_horizontal_alignment: [^;]*;/i, `--voice_states_container_horizontal_alignment: end;`);
					}
					if (alignment.includes('row-1')) {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_vertical_alignment: [^;]*;/i, `--voice_states_container_vertical_alignment: start;`);
					} else if (alignment.includes('row-2')) {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_vertical_alignment: [^;]*;/i, `--voice_states_container_vertical_alignment: center;`);
					} else if (alignment.includes('row-3')) {
						currentPreviewCssText = currentPreviewCssText.replace(/--voice_states_container_vertical_alignment: [^;]*;/i, `--voice_states_container_vertical_alignment: end;`);
					}
				} else {
					let value = cssOption.getAttribute('data-value');
					var regex = new RegExp('--' + attributeId + ': [^;]*;', 'i');
					currentPreviewCssText = currentPreviewCssText.replace(regex, `--${attributeId}: ${value};`);
				}
			}
		});

		// adds style element
		$('.wrapper.preview').contents().find('#preview-css').remove();
		$('.wrapper.preview').contents().find('head').append(`<style id='preview-css'>${currentPreviewCssText}</style>`);
	}

	//	add data-state observer to button[id='generate-css']
	//	triggers updatePreviewCss()
	var generateCssButton = document.getElementById('generate-css');
	var observer14 = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === 'attributes') {
				if (mutation.attributeName === 'data-state') {
					if (mutation.target.dataset.state === 'active') {
						updatePreviewCss();

						mutation.target.dataset.state = 'inactive';
					}
				}
			}
		});
	});
	observer14.observe(generateCssButton, {
		attributes: true,
	});

	updatePreviewCss();
})();
