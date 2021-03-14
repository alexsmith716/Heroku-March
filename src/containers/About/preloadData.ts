import { Store } from 'redux';
import { isInfoAlertThreeLoaded, loadInfoAlertThree } from '../../redux/modules/infoAlertThree';

async function preloadData(store: Store): Promise<any> {
  const infoAlertThreeLoaded = isInfoAlertThreeLoaded(store.getState().infoAlertThree);
  if (!infoAlertThreeLoaded) {
    await store.dispatch<any>(loadInfoAlertThree());
  }
}

export { preloadData };
