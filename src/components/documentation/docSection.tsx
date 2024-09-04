import pages from '../../app/graphql/graphql.module.scss';
import styles from './docSection.module.scss';
import { useEffect, useState } from 'react';
import { IntrospectionQuery, buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import { request } from 'graphql-request';
import { Button, Drawer } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function DocSection({ endpointSdl }: { endpointSdl: string }) {
  const [open, setOpen] = useState(false);
  const [sdl, setSDL] = useState<string>('');
  const anchor: Anchor = 'right';
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <pre style={{ width: '100%', height: '100%', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
      {sdl}
    </pre>
  );

  useEffect(() => {
    async function fetchSchema() {
      try {
        const introspectionQuery = getIntrospectionQuery();
        const response = await request(endpointSdl, introspectionQuery);
        const schema = buildClientSchema(response as IntrospectionQuery);
        const sdl = printSchema(schema);
        setSDL(sdl);
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    }
    fetchSchema();
  }, [endpointSdl]);

  return (
    <div>
      <Button className={`${pages.queryButton} `} onClick={toggleDrawer(true)} variant="contained">
        Show documentation
      </Button>
      <Drawer
        open={open}
        anchor={anchor}
        onClose={toggleDrawer(false)}
        classes={{ paper: styles.drawer }}
      >
        {sdl ? DrawerList : 'Loading documentation...'}
      </Drawer>
    </div>
  );
}

export { DocSection };
