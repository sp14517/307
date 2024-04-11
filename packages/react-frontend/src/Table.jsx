// src/Table.jsx
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody() {
    return <tbody />;
  }

  function Table() {
    return (
      <table>
        <TableHeader />
        <TableBody />
      </table>
    );
}

export default Table