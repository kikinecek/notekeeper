const guest =  (execFunction: any) => async (...args: any[]) => {
  const [, { user }] = args;

  if (user) {
    throw new Error("Not guest")
  }

  return execFunction(...args);
}

const signedIn =  (execFunction: any) => async (...args: any[]) => {
  const [, { user }] = args;

  if (!user) {
    throw new Error("Not signed in")
  }

  return execFunction(...args);
}



export {
  guest,
  signedIn
}