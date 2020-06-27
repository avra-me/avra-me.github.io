import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const changedArray = (a = [], b = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))

const initialState = {error: null, info: null}

class ErrorBoundary extends React.Component {
  state = initialState
  resetErrorBoundary = (...args) => {
    this.props.onReset?.(...args)
    this.setState(initialState)
  }

  componentDidCatch(error, info) {
    this.props.onError?.(error, info?.componentStack)
    console.log(error)
    this.setState({error, info})
  }

  componentDidUpdate(prevProps) {
    const {error} = this.state
    const {resetKeys} = this.props
    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys)
      this.setState(initialState)
    }
  }

  render() {
    const {error, info} = this.state;
    const {children, ...rest} = this.props;
    if (error !== null) {
      return <Skeleton {...rest} />;
    }
    return children;
  }
}

export default ErrorBoundary;
