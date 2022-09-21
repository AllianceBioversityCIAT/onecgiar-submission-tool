export class PusherBlocked {
  private pusherBlockedRoutes = [
    '/context/measurable-objectives',
    '/work-package-research-plans-and-tocs/work-packages/work-package',
    '/work-package-research-plans-and-tocs/full-initiative-toc',
    '/melia/table-a/impact-area/',
    '/table-b',
    '/melia/table-c',
  ];
  currentRoute: string;
  constructor(currentRoute) {
    this.currentRoute = currentRoute;
  }
  blockedRoute() {
    console.log(this.currentRoute);
    const sdsd = this.pusherBlockedRoutes.some(
      (route) => this.currentRoute.indexOf(route) >= 0
    );
    console.log(sdsd);
    return sdsd;
  }
}
