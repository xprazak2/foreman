import React from 'react';
import store from '../redux';
import PieChart from '../components/common/charts/PieChart/';
import StatisticsChartsList from '../components/statistics/StatisticsChartsList';
import PowerStatus from '../components/hosts/powerStatus/';
import NotificationContainer from '../components/notifications/';
import ToastsList from '../components/toastNotifications/';
import StorageContainer from '../components/hosts/storage/vmware/';
import _ from 'lodash';

let componentRegistry = () => {
    let registry = {
      PieChart: {
        type: PieChart,
        store: true,
        data: true
      },
      StatisticsChartsList: {
        type: StatisticsChartsList,
        store: true,
        data: true
      },
      PowerStatus: {
        type: PowerStatus,
        store: true,
        data: true
      },
      NotificationContainer: {
        type: NotificationContainer,
        store: true,
        data: true
      },
      ToastNotifications: {
        type: ToastsList,
        store: true,
        data: false
      }
    };

    return function () {
      let register = (name, component) => {
        if (registry[name]) {
          throw 'Component name already taken';
        }
        registry[name] = component;
        console.log('Component registered with name ' + name);
        return registry;
      };

      let getComponent = (name) => {
        return registry[name];
      };

      let registeredComponents = () => {
        return _.map(registry, (value, key) => {
          return key;
        }).join(', ');
      };

      let markup = (name, data, store) => {
        let currentComponent = getComponent(name);
        if (!currentComponent) {
          throw `Component not found:  ${name} among ${registeredComponents()}`
        }
        let ComponentName = currentComponent.type;
        return <ComponentName data={ currentComponent.data ? data : undefined } store={ currentComponent.store ? store : undefined } />;
      };

      return { register, getComponent, markup };
    }();
};

export default componentRegistry();
