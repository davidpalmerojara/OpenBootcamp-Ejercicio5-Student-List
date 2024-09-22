const input = document.querySelector('input');

input.setAttribute('size', input.getAttribute('placeholder').length);

const setActive = () => {
	document.querySelector('.table-input').classList.toggle('table-input-active');
};

const sortTable = (n) => {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		icon,
		switchcount = 0;
	table = document.getElementById('table');
	switching = true;
	// Set the sorting direction to ascending:
	dir = 'asc';
	icon = document.querySelectorAll('i')[n + 1];

	if (icon.className == 'fas fa-sort-alpha-down') icon.className = 'fas fa-sort-alpha-up';
	else if (icon.className == 'fa-solid fa-arrow-down-1-9') icon.className = 'fa-solid fa-arrow-up-1-9';
	else if (icon.className == 'fa-solid fa-arrow-up-1-9') icon.className = 'fa-solid fa-arrow-down-1-9';
	else if (icon.className == 'fas fa-sort-alpha-up') icon.className = 'fas fa-sort-alpha-down';

	while (switching) {
		switching = false;
		rows = table.rows;

		for (i = 1; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName('TD')[n];
			y = rows[i + 1].getElementsByTagName('TD')[n];

			if (dir == 'asc') {
				if (x.innerHTML.localeCompare(y.innerHTML, { sensitivity: 'base' }) > 0) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == 'desc') {
				if (x.innerHTML.localeCompare(y.innerHTML, { sensitivity: 'base' }) < 0) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount == 0 && dir == 'asc') {
				dir = 'desc';
				switching = true;
			}
		}
	}
};

const searchTable = () => {
	var input, filter, found, table, tr, td, i, j;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	table = document.getElementById('table');
	tr = table.getElementsByTagName('tr');
	for (i = 1; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td');
		for (j = 0; j < td.length; j++) {
			if (j == td.length - 1) {
				const childs = td[j].childNodes;
				for (const child of childs) {
					if (child.className === 'tag') {
						if (child.innerText.toUpperCase().indexOf(filter) > -1) {
							found = true;
						}
					}
				}
			} else {
				if (td[j].innerHTML.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(filter) > -1) {
					found = true;
				}
			}
		}
		if (found) {
			tr[i].style.display = '';
			found = false;
		} else {
			tr[i].style.display = 'none';
		}
	}
};
