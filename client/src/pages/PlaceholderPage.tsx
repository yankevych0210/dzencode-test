import React from 'react';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div style={{ padding: '40px', color: '#555', textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>{title}</h1>
            <p style={{ fontSize: '16px', color: '#888' }}>Страница в разработке.</p>
        </div>
    );
};

export default PlaceholderPage;
