export const TableSkeleton = () => (
  <div className="w-full" data-testid="skeleton">
    <table>
      <thead>
        <tr>
          <th>
            <div className="skeleton">
              <span>#</span>
            </div>
          </th>
          <th>
            <div className="skeleton">
              <span>NAME</span>
            </div>
          </th>
          <th>
            <div className="skeleton">
              <span>POINTS</span>
            </div>
          </th>
          <th>
            <div className="skeleton">
              <span># OF WINS</span>
            </div>
          </th>
          <th>
            <div className="skeleton">
              <span># OF TOP10&apos;s</span>
            </div>
          </th>
          <th>
            <div className="skeleton">
              <span># OF EVENTS</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, i) => (
          <tr key={i}>
            <td>
              <div className="skeleton skeleton-loading"></div>
            </td>
            <td>
              <div className="skeleton skeleton-loading"></div>
            </td>
            <td>
              <div className="skeleton skeleton-loading"></div>
            </td>
            <td>
              <div className="skeleton skeleton-loading"></div>
            </td>
            <td>
              <div className="skeleton skeleton-loading"></div>
            </td>
            <td>
              <div className="skeleton skeleton-loading"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
