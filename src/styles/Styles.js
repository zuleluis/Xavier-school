import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightRegular,
      color: "white",
    },
    head: {
      backgroundColor: "#0A043C",
      width: '100%',
      display: 'flex',
    },
    main: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(5),
        flexGrow:1
    },
    mainDiv: {
        maxWidth: 1100,
        width: "100%",
        marginBottom: theme.spacing(4)
      },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

export default useStyles;