import * as Yup from 'yup';
const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const recepieSchema = Yup.object().shape({
    recepieName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    image: Yup.mixed()
        .required("A file is required")
        .test(
            "fileFormat",
            "Unsupported Format",
            value => (value && SUPPORTED_FORMATS.includes(value.type)) || typeof value === 'string'
        )
        .test(
            "fileSize",
            "File too large",
            value => (value && value.size <= FILE_SIZE) || typeof value === 'string'
        )
});

export default recepieSchema;
