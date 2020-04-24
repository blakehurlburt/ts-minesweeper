import * as React from 'react';

import * as minesweeper from './minesweeper';

import './Cell.css';

type CellProps = minesweeper.Cell & {
  onLeftClick(): void
  onRightClick(): void
};

class Cell extends React.Component<CellProps> {
  constructor(props: CellProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (e.ctrlKey) {
      this.props.onRightClick();
    } else {
      this.props.onLeftClick();
    }
  }

  onContextMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.onRightClick();
  }

  render() {
    const {
      status,
      revealedCount,
    } = this.props;

    let icon = <i>.</i>;
    let className = 'cell';
    if (status === minesweeper.CellStatus.Exploded) {
      icon = <i className="fa fa-bomb" />;
      className += ' cell--exploded';
    } else if (status === minesweeper.CellStatus.Revealed) {
      icon = <i>{revealedCount > 0 ? revealedCount.toString() : '.'}</i>;
      className += ` cell--revealed cell--revealed-${revealedCount}`;
    } else if (status === minesweeper.CellStatus.Flagged) {
      icon = <i className="fa fa-flag" />;
      className += ' cell--flagged';
    }

    return (
      <button
        className={className}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}
      >
        {icon}
      </button>
    );
  }
}

export default Cell;
