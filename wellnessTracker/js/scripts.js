const saveBtn = document.querySelector('#saveProfile');

saveBtn.addEventListener('click', () => {
    let fn = document.querySelector('input[name="first"]');
    localStorage.setItem('wellness-first', fn.value)
    let ln = document.querySelector('input[name="last"]');
    localStorage.setItem('wellness-last', ln.value)
    let select = document.querySelector('#physical');
    let ev = select.options[select.selectedIndex].value;
    localStorage.setItem('wellness-emoji', ev)
    let et = select.options[select.selectedIndex].text;
    localStorage.setItem('wellness-text', et);
})

const deleteBtn = document.querySelector('#delProfile')
deleteBtn.addEventListener('click', () => {
    localStorage.removeItem('wellness-first');
    localStorage.removeItem('wellness-last');
    localStorage.removeItem('wellness-emoji');
    localStorage.removeItem('wellness-text');
    location.reload();
})

const check = localStorage.getItem('wellness-first')
console.log(check);
if (check === null) {
    document.querySelector('#newProfile').className = 'showMe'
    document.querySelector('#myProfile').className = 'hideMe'

    //do nothing
}
else {
    document.querySelector('#newProfile').className = 'hideMe'
    document.querySelector('#myProfile').className = 'showMe'

    document.querySelector('#first').textContent = localStorage.getItem('wellness-first');
    document.querySelector('#last').textContent = localStorage.getItem('wellness-last');
    document.querySelector('#emotion').textContent = localStorage.getItem('wellness-text');
    document.querySelector('#emoji').src = localStorage.getItem('wellness-emoji');
}

