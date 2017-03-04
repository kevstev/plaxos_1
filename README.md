# plaxos_1
to start:
node index.js
I used node v.6.9.4, but should run on any version. 

Bonus question:
Running the sha command on /post could eventually become a bottleneck for the event loop. To scale this, one could run the cluster module, though this is a quick and dirty implementation- the only storage is an in memory hash map. One would then need some sort of database for persistence such as MongoDB. Other ways to help scale is to use Redis as the caching layer for the GET's. We don't do much work aside from a look up, but if this were a real system, I would be storing to a database of some sort and those lookups are relatively expensive compared to a redis lookup. 

