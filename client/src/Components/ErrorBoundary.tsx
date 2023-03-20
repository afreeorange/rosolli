import React from "react";
import { IoSkullOutline } from "react-icons/io5";

import styles from "./ErrorBoundary.module.scss";

type Props = {
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.component}>
          <div>
            <IoSkullOutline />
            <p>
              Something terrible happened. <br /> Please reload. <br />
              <small>Check the console for errors.</small>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
