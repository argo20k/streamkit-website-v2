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
//

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

const dropdowns = document.querySelectorAll('.wrapper.dropdown');
dropdowns.forEach((dropdown) => {
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
		dropdowns.forEach((dropdown) => {
			closeDropdown(dropdown);
		});
	}
	let currentDropdownWrapper;
	if (clickedDropdownPickerButton) {
		// toggle dropdown state (open/closed)
		currentDropdownWrapper = clickedDropdownPickerButton.parentNode;
		toggleDropdownState(currentDropdownWrapper);

		// close all other dropdowns
		dropdowns.forEach((dropdown) => {
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
