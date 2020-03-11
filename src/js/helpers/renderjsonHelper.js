import renderjson from 'renderjson';


export const renderJsonDefaultConfig = () => {
  renderjson.set_icons('+', '-');
  renderjson.set_show_to_level(1);
};
