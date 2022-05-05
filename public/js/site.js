const form = document.querySelector('#form');

form.addEventListener('submit', async function (e) {
    const cityValue = e.currentTarget.querySelector('input').value;
    const jsonEle = document.querySelector('#json');
    e.preventDefault();
    const url = `/weather?address=${cityValue}`;
    const dataValue = await fetch(url).then((response) => response.json()).then((data) => { return data }).catch((err) => error = err);
    jsonEle.innerHTML = dataValue.error == null ? dataValue.body.current.condition.text : dataValue.error;
});

