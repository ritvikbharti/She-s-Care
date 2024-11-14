// components/ui/Card.jsx
export default function Card({ children, className, ...props }) {
    return (
      <div className={` p-4 rounded-xl ${className}`} {...props}>
        {children}
      </div>
    );
  }
  