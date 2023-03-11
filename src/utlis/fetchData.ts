const { API_BASE_URL, API_KEY } = import.meta.env;
// import { GraphQLClient } from 'graphql-request';
// import {
//   GetMembersQuery,
// } from './queries';

const client = new GraphQLClient(`${API_BASE_URL}/graphql`, {
  headers: {
    Authorization: `bearer ${API_KEY}`,
  },
});

async function getTeamMembers(): Promise<Member[]> {
  const { members } = await client.request(GetMembersQuery);

  return members.data.map(member => ({
    id: member.id,
    name: member.attributes.name,
    designation: member.attributes.designation,
    department: member.attributes.department,
    imgUrl:
      member.attributes.image.data.attributes.formats?.medium?.url ??
      member.attributes.image.data.attributes.url,
  }));
}


export {
  getTeamMembers,
};