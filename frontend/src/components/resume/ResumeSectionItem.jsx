export default function ResumeSectionItem(props) {
  const item = props.item;
  
  // Handle summary-style items with just 'text' property
  if (item.text) {
    return (
      <div className="item">
        <p>{item.text}</p>
      </div>
    );
  }
  
  // Handle regular items with title, subtitle, etc.
  return (
    <div className="item">
      <div className="item_heading">
        <div className="info">
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>
        <div className="details">
          <div className="location">{item.location}</div>
          <div className="duration">{item.duration}</div>
        </div>
      </div>
      {Array.isArray(item.details) && item.details.length > 0 && (
        <ul>
          {item.details.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}