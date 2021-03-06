import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteProduct } from "../../reducks/products/operations";
import { getIsAdmin } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)",
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.33333% - 32px)",
    },
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const price = props.price.toLocaleString();
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isAdmin = getIsAdmin(selector);
  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        image={images[0].path}
        className={classes.media}
        onClick={() => dispatch(push("/product/" + props.id + "/information"))}
      />
      <CardContent className={classes.content}>
        <div
          onClick={() =>
            dispatch(push("/product/" + props.id + "/information"))
          }
        >
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ￥{price}
          </Typography>
        </div>

        {isAdmin && (
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          keepMounted
        >
          <MenuItem
            onClick={() => {
              dispatch(push("/product/edit/" + props.id));
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id));
              handleClose();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
