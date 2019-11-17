import * as Yup from 'yup';

let re = /(\d[/]\d)/;

const ingredientSchema = Yup.object().shape({
    quantity: Yup.mixed()
        .test(
            'value must be a number ex. 4 or 2.5 or 1/2 ',
            value => re.exec(value) || (!isNaN(value) & value > 0)
        ),
    unit: Yup.string()
        .trim()
        .min(2, 'Too Short!')
        .max(25, 'Too Long!')
        .required('Required'),
    ingredientName: Yup.string()
        .trim()
        .min(2, 'Too Short!')
        .max(25, 'Too Long!')
        .required('Required')
});

export default ingredientSchema;
