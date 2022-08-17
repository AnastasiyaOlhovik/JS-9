import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button'),
  delay: document.querySelector('[name= delay]'),
  step: document.querySelector('[name= step ]'),
  amount: document.querySelector('[name= amount ]'),
}

const formData = {
  delay: 0,
  step: 0,
  amount: 0,
}

const onInputChange = (e) => { formData[e.target.name] = Number(e.target.value); }

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
      } else {
        reject(Notiflix.Notify.failure(`Fulfilled promise ${position} in ${delay}ms`))
      }
    }, delay)
  })
}

refs.delay.addEventListener('input', onInputChange);

refs.step.addEventListener('input', onInputChange);

refs.amount.addEventListener('input', onInputChange);

refs.startBtn.addEventListener('click', (e) => {
  e.preventDefault()

  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, formData.delay)
      .then(value => { })
      .catch(error => { });

    formData.delay += formData.step;
  }
})