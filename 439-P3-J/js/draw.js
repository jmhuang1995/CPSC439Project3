function gather_info(tm, rctx) {

  let row = 0;
  let col = 0;

  while (row < tm.state.length) {

    col = 0;
    while (col < tm.state[0].length) {
      cells[tm.hr][tm.hc].liveNeighbor = 0;
      read_state(tm, rctx, "nw");
      read_state(tm, rctx, "n");
      read_state(tm, rctx, "ne");
      read_state(tm, rctx, "w");
      read_state(tm, rctx, "c");
      read_state(tm, rctx, "e");
      read_state(tm, rctx, "sw");
      read_state(tm, rctx, "s");
      read_state(tm, rctx, "se");
      col++;
      if (col != tm.state[0].length) move_right(tm, rctx);
    }

    row++;

    if (row != tm.state.length) {
      while (tm.hc != 0) move_left(tm, rctx);
      move_down(tm, rctx);
    }

  }

}

function reset_tmhead(tm, rctx) {
  while (tm.hr != 0) move_up(tm, rctx);
  while (tm.hc != 0) move_left(tm, rctx);
}

function move_up(tm, rctx) {
  reset_color(tm, rctx);
  tm.hr--;
  rctx.fillStyle = "red";
  rctx.fillRect(tm.hc * scale, tm.hr * scale, scale, scale);
}

function move_down(tm, rctx) {
  reset_color(tm, rctx);
  tm.hr++;
  rctx.fillStyle = "red";
  rctx.fillRect(tm.hc * scale, tm.hr * scale, scale, scale);
}

function move_left(tm, rctx) {
  reset_color(tm, rctx);
  tm.hc--;
  rctx.fillStyle = "red";
  rctx.fillRect(tm.hc * scale, tm.hr * scale, scale, scale);
}

function move_right(tm, rctx) {
  reset_color(tm, rctx);
  tm.hc++;
  rctx.fillStyle = "red";
  rctx.fillRect(tm.hc * scale, tm.hr * scale, scale, scale);
}

function reset_color(tm, rctx) {
  rctx.fillStyle = (cells[tm.hr][tm.hc].state == 0) ? "black" : "white";
  rctx.fillRect(tm.hc * scale, tm.hr * scale, scale, scale);
}

function read_state(tm, rctx, targetCell) {
  switch (targetCell) {

    case "nw":
      if (tm.hr == 0 || tm.hc == 0) {
        tm.nwState = 0;
      }
      else {
        move_left(tm, rctx);
        move_up(tm, rctx);
        tm.nwState = cells[tm.hr][tm.hc].state;
        move_down(tm, rctx);
        move_right(tm, rctx);
        if (tm.nwState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "n":
      if (tm.hr == 0) {
        tm.nState = 0;
      }
      else {
        move_up(tm, rctx);
        tm.nState = cells[tm.hr][tm.hc].state;
        move_down(tm, rctx);
        if (tm.nState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "ne":
      if (tm.hr == 0 || tm.hc == (tm.state[0].length - 1)) {
        tm.neState = 0;
      }
      else {
        move_right(tm, rctx);
        move_up(tm, rctx);
        tm.neState = cells[tm.hr][tm.hc].state;
        move_down(tm, rctx);
        move_left(tm, rctx);
        if (tm.neState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "w":
      if (tm.hc == 0) {
        tm.wState = 0;
      }
      else {
        move_left(tm, rctx);
        tm.wState = cells[tm.hr][tm.hc].state;
        move_right(tm, rctx);
        if (tm.wState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "c":
      tm.cState = cells[tm.hr][tm.hc].state;
      break;

    case "e":
      if (tm.hc == (tm.state[0].length - 1)) {
        tm.eState = 0;
      }
      else {
        move_right(tm, rctx);
        tm.eState = cells[tm.hr][tm.hc].state;
        move_left(tm, rctx);
        if (tm.eState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "sw":
      if (tm.hr == (tm.state.length - 1) || tm.hc == 0) {
        tm.swState = 0;
      }
      else {
        move_left(tm, rctx);
        move_down(tm, rctx);
        tm.swState = cells[tm.hr][tm.hc].state;
        move_up(tm, rctx);
        move_right(tm, rctx);
        if (tm.swState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "s":
      if (tm.hr == (tm.state.length - 1)) {
        tm.sState = 0;
      }
      else {
        move_down(tm, rctx);
        tm.sState = cells[tm.hr][tm.hc].state;
        move_up(tm, rctx);
        if (tm.sState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;

    case "se":
      if (tm.hr == (tm.state.length - 1) || tm.hc == (tm.state[0].length - 1)) {
        tm.seState = 0;
      }
      else {
        move_right(tm, rctx);
        move_down(tm, rctx);
        tm.seState = cells[tm.hr][tm.hc].state;
        move_up(tm, rctx);
        move_left(tm, rctx);
        if (tm.seState == 1) cells[tm.hr][tm.hc].liveNeighbor++;
      }
      break;
  }
}

function write_state(tm, rctx) {
 
  if (cells[tm.hr][tm.hc].state == 1) {
    
    if (cells[tm.hr][tm.hc].liveNeighbor < 2) {
      cells[tm.hr][tm.hc].state = 0;
    }

  
    else if (cells[tm.hr][tm.hc].liveNeighbor == 2 || cells[tm.hr][tm.hc].liveNeighbor == 3) {
      cells[tm.hr][tm.hc].state = 1;
    }

    
    else if (cells[tm.hr][tm.hc].liveNeighbor > 3) {
      cells[tm.hr][tm.hc].state = 0;
    }
  }

 
  else {
    
    if (cells[tm.hr][tm.hc].liveNeighbor == 3) {
      cells[tm.hr][tm.hc].state = 1;
    }
  }

  reset_color(tm, rctx);
}

function generate_nextgen(tm, rctx) {

  let row = 0;
  let col = 0;

  while (row < tm.state.length) {

    col = 0;
    while (col < tm.state[0].length) {
      write_state(tm, rctx);
      col++;
      if (col != tm.state[0].length) move_right(tm, rctx);
    }

    row++;

    if (row != tm.state.length) {
      while (tm.hc != 0) move_left(tm, rctx);
      move_down(tm, rctx);
    }

  }

}

var cells = [[],[]];

function draw_cells(rctx, scale) {

  let width = rctx.canvas.width / scale;
  let height = rctx.canvas.height / scale;

  
  for (let row = 0; row < height; row++) {
    if (!cells[row]) cells[row] = [];
    for (let col = 0; col < width; col++) {
      cells[row][col] = {
        state: 0,
        liveNeighbor: 0
      };
    }
  }

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      cells[row][col].state = Math.floor(Math.random() * 2);
      rctx.fillStyle = (cells[row][col].state == 0) ? "white" : "black";
      rctx.fillRect(col * scale, row * scale, scale, scale);
    }
  }

  tm = {
    hr: 0,
    hc: 0,
    state: cells,
    nwState: 0,
    nState: 0,
    neState: 0,
    wState: 0,
    cState: 0,
    eState: 0,
    swState: 0,
    sState: 0,
    seState: 0
  };

  setInterval(function() {
    gather_info(tm, rctx);
    reset_tmhead(tm, rctx);
    generate_nextgen(tm, rctx);
    reset_tmhead(tm, rctx);
  }, 100);

}



