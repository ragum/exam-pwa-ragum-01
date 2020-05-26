import { makeStyles } from '@material-ui/core';
import {
    FlexColumn, CreatePadding, Centering,
} from '@theme/mixins';

import { GRAY_LIGHT } from '@theme/colors';

export default makeStyles({
    root: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        alignItems: 'center',
    },
    authBlock: {
        ...Centering,
        width: '100%',
        height: '65vh',
        ...CreatePadding(15, 30, 15, 30),
        textAlign: 'center',
    },
    btnSigin: {
        marginBottom: 35,
        marginTop: 15,
    },
    span: {
        width: '100%',
        height: 20,
        background: GRAY_LIGHT,
    },
});
