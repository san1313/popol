type projectType = {
  id: string,
  title: string,
  period: string,
  environment: string,
  languages: string,
  libraries: string,
  deployment: string,
  roles?: string[],
  imgCount: number,
  href?: string,
  comments?: string[],
};

export { projectType };