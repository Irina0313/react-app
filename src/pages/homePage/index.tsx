import { useAppSelector } from '../../hooks/reduxHooks';

const HomePage = () => {
  const data = useAppSelector((state) => state.formData);

  return (
    <>
      <h2>HomePage</h2>
      <div>
        <h3>Form Results</h3>
        {data.map((res, index) => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              border: index === 0 ? '2px solid green' : '2px solid red',
              margin: '10px',
            }}
            key={index}
          >
            {Object.entries(res).map(([key, value]) => (
              <div key={key}>
                {key === 'picture' && value ? (
                  <img width={100} src={`${value}`} alt="Uploaded" />
                ) : (
                  <div style={{ margin: '10px' }}>
                    {key} : {value};
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
